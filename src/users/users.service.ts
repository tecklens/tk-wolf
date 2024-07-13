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
import { ChangeProfileDto } from '@app/users/dtos/change-profile.dto';
import { BugReportRepository } from '@libs/repositories/bug-report/bug-report.repository';
import { SubmitBugRequestDto } from '@app/users/dtos/submit-bug-request.dto';
import { v4 as uuidv4 } from 'uuid';
import { HttpStatusCode } from 'axios';
import { ChangePassDto } from '@app/auth/dtos/change-pass.dto';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private environmentRepository: EnvironmentRepository,
    private readonly httpService: HttpService,
    private readonly bugReportRepository: BugReportRepository,
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

  public async updateProfile(u: IJwtPayload, d: ChangeProfileDto) {
    const email = normalizeEmail(d.email);
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestException('Account not exited');

    await this.userRepository.update(
      {
        _id: u._id,
      },
      {
        $set: {
          bio: d.bio,
          urls: d.urls,
          username: d.username,
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

  async updateGuide(u: IJwtPayload, type: string) {
    switch (type) {
      case 'workflow':
        await this.userRepository.updateOne(
          {
            _id: u._id,
          },
          {
            workflowGuide: true,
          },
        );
        break;
      case 'billing':
        await this.userRepository.updateOne(
          {
            _id: u._id,
          },
          {
            billingGuide: true,
          },
        );
        break;
      case 'api-key':
        await this.userRepository.updateOne(
          {
            _id: u._id,
          },
          {
            apiKeyGuide: true,
          },
        );
        break;
      default:
        break;
    }
  }

  async submitBugFromWeb(u: IJwtPayload, payload: SubmitBugRequestDto) {
    return await this.bugReportRepository.create({
      title: payload.title,
      description: payload.description,
      _userId: u._id,
    });
  }

  async sendChangePassword(u: IJwtPayload) {
    const tx_id = uuidv4();
    const user = await this.userRepository.findById(u._id, '_id email');

    if (user) {
      await this.userRepository.updateOne(
        {
          _id: user._id,
        },
        {
          changePasswordTransactionId: tx_id,
        },
      );

      const response = await this.httpService
        .request({
          method: 'POST',
          url: 'https://flow.wolfx.app/wolf/v1/trigger/',
          data: JSON.stringify({
            workflowId: '669237b10327d4603ce954a2',
            target: {
              subcriberId: `change-password-${tx_id}`,
              phone: '0339210372',
              email: user.email,
              tx_id: tx_id,
            },
            overrides: {},
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey d171212c22a1fa2b7b4643a75fbf3e8e`,
          },
          validateStatus: null,
        })
        .toPromise();

      if (response.status === HttpStatusCode.Created) {
        console.debug('send change password success');
      } else {
        throw new BadRequestException(
          'There was an error when sending the password reset email.',
        );
      }
    }
  }

  async changePass(u: IJwtPayload, payload: ChangePassDto) {
    const user = await this.userRepository.findById(
      u._id,
      '_id changePasswordTransactionId',
    );

    if (
      !user ||
      payload.changePasswordTransactionId !== user.changePasswordTransactionId
    )
      throw new BadRequestException(
        'Invalid request. The Transaction ID is either unsuccessful or has expired.',
      );

    const passwordHash = await bcrypt.hash(payload.password, 10);

    await this.userRepository.updateOne(
      {
        _id: user._id,
      },
      {
        password: passwordHash,
        changePasswordTransactionId: null,
      },
    );
  }
}
