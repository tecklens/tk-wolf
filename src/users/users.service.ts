import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@libs/repositories/user';
import { createHash } from '@pak/utils/hmac';
import { ChangeProfileEmailDto } from '@app/users/dtos/change-profile-email.dto';
import { normalizeEmail } from '@pak/utils/email-normalization';
import { IJwtPayload } from '@libs/shared/types';
import { Cache, CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import {
  buildAuthServiceKey,
  buildUserKey,
} from '@libs/shared/entities/key-builder';
import { EnvironmentRepository } from '@libs/repositories/environment';
import { decryptApiKey } from '@libs/shared/encryptions/encrypt-provider';
import { UserOnboardingRequestDto } from '@app/users/dtos/user-onboarding-request.dto';
import { UserOnboardingTourRequestDto } from '@app/users/dtos/user-onboarding-tour-request.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private environmentRepository: EnvironmentRepository,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.username === username);
  }

  @CacheKey('user:profile')
  public async getMyProfile(userId: string) {
    Logger.verbose('Getting User from user repository in Command');
    Logger.debug('Getting user data for ' + userId);
    const profile = await this.userRepository.findById(userId);

    if (!profile) {
      throw new NotFoundException('User not found');
    }

    /*
     * This code is added for intercom identity verification, so that we have hash value saved for all users.
     * This code can be deleted after 30 Sept, 2023.
     * Read more about Intercom Identity Verification here
     * https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile
     */
    if (
      process.env.INTERCOM_IDENTITY_VERIFICATION_SECRET_KEY &&
      !profile.servicesHashes?.intercom
    ) {
      const intercomSecretKey = process.env
        .INTERCOM_IDENTITY_VERIFICATION_SECRET_KEY as string;
      const userHashForIntercom = createHash(intercomSecretKey, profile._id);

      await this.userRepository.update(
        { _id: profile._id },
        {
          $set: {
            'servicesHashes.intercom': userHashForIntercom,
          },
        },
      );
    }

    Logger.verbose('Found User');

    return profile;
  }

  public async updateProfileEmail(u: IJwtPayload, d: ChangeProfileEmailDto) {
    const email = normalizeEmail(d.email);
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new BadRequestException('E-mail is invalid or taken');

    await this.userRepository.update(
      {
        _id: u._id,
      },
      {
        $set: {
          email,
        },
      },
    );

    await this.cacheManager.del(
      buildUserKey({
        _id: u._id,
      }),
    );

    const apiKeys = await this.environmentRepository.getApiKeys(
      u.environmentId,
    );

    const decryptedApiKey = decryptApiKey(apiKeys[0].key);

    await this.cacheManager.del(
      buildAuthServiceKey({
        apiKey: decryptedApiKey,
      }),
    );

    const updatedUser = await this.userRepository.findById(u._id);
    if (!updatedUser) throw new NotFoundException('User not found');

    // this.analyticsService.setValue(updatedUser._id, 'email', email);

    return updatedUser;
  }

  public async updateOnBoarding(u: IJwtPayload, d: UserOnboardingRequestDto) {
    await this.cacheManager.del(
      buildUserKey({
        _id: u._id,
      }),
    );

    await this.userRepository.update(
      {
        _id: u._id,
      },
      {
        $set: {
          showOnBoarding: d.showOnBoarding,
        },
      },
    );

    const user = await this.userRepository.findById(u._id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  public async updateOnBoardingTour(
    u: IJwtPayload,
    d: UserOnboardingTourRequestDto,
  ) {
    const user = await this.userRepository.findById(u._id);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.update(
      {
        _id: u._id,
      },
      {
        $set: {
          showOnBoardingTour: d.showOnBoardingTour,
        },
      },
    );

    await this.cacheManager.del(
      buildUserKey({
        _id: u._id,
      }),
    );

    const updatedUser = await this.userRepository.findById(u._id);
    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }
}
