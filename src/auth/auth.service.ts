import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  ApiServiceLevelEnum,
  IJwtPayload,
  SignUpOriginEnum,
} from '@libs/shared/types';
import { Cache, CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import {
  EnvironmentEntity,
  EnvironmentRepository,
} from '@libs/repositories/environment';
import {
  IUserResetTokenCount,
  UserEntity,
  UserRepository,
} from '@libs/repositories/user';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';
import { AuthProviderEnum } from '@libs/shared/entities/user';
import { normalizeEmail } from '@pak/utils/email-normalization';
import { ApiException } from '@pak/utils/exceptions';
import { UserRegistrationBodyDto } from '@app/auth/dtos/user-registration.dto';
import * as bcrypt from 'bcrypt';
import {
  OrganizationEntity,
  OrganizationRepository,
} from '@libs/repositories/organization';
import { ICreateOrganizationDto } from '@libs/shared/dto';
import { createHash as createHashHmac } from '@pak/utils/hmac';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { buildUserKey } from '@libs/shared/entities/key-builder';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isBefore,
  parseISO,
  subDays,
} from 'date-fns';
import { PasswordResetBodyDto } from '@app/auth/dtos/password-reset.dto';
import { LoginBodyDto } from '@app/auth/dtos/login.dto';
import { Novu } from '@novu/node';

@Injectable()
export class AuthService {
  private MAX_ATTEMPTS_IN_A_MINUTE = 5;
  private MAX_ATTEMPTS_IN_A_DAY = 15;
  private RATE_LIMIT_IN_SECONDS = 60;
  private RATE_LIMIT_IN_HOURS = 24;

  private BLOCKED_PERIOD_IN_MINUTES = 5;
  private MAX_LOGIN_ATTEMPTS = 5;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private environmentRepository: EnvironmentRepository,
    private userRepository: UserRepository,
    private organizationRepository: OrganizationRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async validateUserLocal(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userRepository.findByEmailAndPassword(
      email,
      passwordHash,
    );
  }

  public async validateUser(payload: IJwtPayload): Promise<UserEntity> {
    // We run these in parallel to speed up the query time
    const userPromise = this.getUser({ _id: payload._id });
    const isMemberPromise = Promise.resolve(true);
    const [user, isMember] = await Promise.all([userPromise, isMemberPromise]);

    if (!user) throw new UnauthorizedException('User not found');
    if (payload.organizationId && !isMember) {
      throw new UnauthorizedException(
        `Not authorized for organization ${payload.organizationId}`,
      );
    }

    return user;
  }

  public async authenticate(
    authProvider: AuthProviderEnum,
    accessToken: string,
    refreshToken: string,
    profile: {
      name: string;
      login: string;
      email: string;
      avatar_url: string;
      id: string;
      company: string;
      blog: string;
      location: string;
    },
    distinctId: string,
    origin?: SignUpOriginEnum,
  ) {
    const email = normalizeEmail(profile.email);
    let user = await this.userRepository.findByEmail(email);
    let newUser = false;

    if (!user) {
      const firstName = profile.name
        ? profile.name.split(' ').slice(0, -1).join(' ')
        : profile.login;
      const lastName = profile.name
        ? profile.name.split(' ').slice(-1).join(' ')
        : null;

      user = await this.userRepository.create({
        profilePicture: profile.avatar_url,
        email,
        firstName,
        lastName,
        showOnBoarding: true,
        tokens: {
          username: profile.login,
          profileId: profile.id,
          provider: authProvider,
          accessToken,
          refreshToken,
          valid: true,
        },
      });
      newUser = true;

      if (distinctId) {
        // this.analyticsService.alias(distinctId, user._id);
      }

      // this.analyticsService.track('[Authentication] - Signup', user._id, {
      //   loginType: authProvider,
      //   origin: origin,
      // });
    } else {
      if (
        authProvider === AuthProviderEnum.GITHUB ||
        authProvider === AuthProviderEnum.GOOGLE
      ) {
        user = await this.updateUserUsername(user, profile, authProvider);
      }

      // this.analyticsService.track('[Authentication] - Login', user._id, {
      //   loginType: authProvider,
      // });
    }

    // this.analyticsService.upsertUser(user, user._id);

    return {
      newUser,
      token: await this.generateUserToken(user),
    };
  }
  public async generateUserToken(user: UserEntity) {
    return this.getSignedToken(user);
  }

  public async validateApiKey(apiKey: string): Promise<IJwtPayload> {
    const { environment, user, error } = await this.getApiKeyUser({
      apiKey,
    });

    if (error) throw new UnauthorizedException(error);

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      roles: [MemberRoleEnum.ADMIN],
      organizationId: environment._organizationId,
      environmentId: environment._id,
      exp: 0,
    };
  }
  public async refreshToken(userId: string) {
    const user = await this.getUser({ _id: userId });
    if (!user) throw new UnauthorizedException('User not found');

    return this.getSignedToken(user);
  }
  public async getSignedToken(
    user: UserEntity,
    organizationId?: string,
    environmentId?: string,
  ): Promise<string> {
    const roles: MemberRoleEnum[] = [];
    // if (member && member.roles) {
    //   roles.push(...member.roles);
    // }

    return this.jwtService.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        organizationId: organizationId || null,
        roles,
        environmentId: environmentId || null,
      },
      {
        expiresIn: '30 days',
        issuer: 'novu_api',
      },
    );
  }
  public async userRegistration(body: UserRegistrationBodyDto) {
    if (process.env.DISABLE_USER_REGISTRATION === 'true')
      throw new ApiException('Account creation is disabled');

    const email = normalizeEmail(body.email);
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ApiException('User already exists');

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await this.userRepository.create({
      email,
      firstName: body.firstName.toLowerCase(),
      lastName: body.lastName?.toLowerCase(),
      password: passwordHash,
    });

    if (process.env.INTERCOM_IDENTITY_VERIFICATION_SECRET_KEY) {
      const intercomSecretKey = process.env
        .INTERCOM_IDENTITY_VERIFICATION_SECRET_KEY as string;
      const userHashForIntercom = createHashHmac(intercomSecretKey, user._id);
      await this.userRepository.update(
        { _id: user._id },
        {
          $set: {
            'servicesHashes.intercom': userHashForIntercom,
          },
        },
      );
    }

    let organization: OrganizationEntity;
    if (body.organizationName) {
      this.createOrg({
        name: body.organizationName,
        userId: user._id,
        jobTitle: body.jobTitle,
        domain: body.domain,
      });
    }

    // this.analyticsService.upsertUser(user, user._id);

    // this.analyticsService.track('[Authentication] - Signup', user._id, {
    //   loginType: 'email',
    //   origin: command.origin || SignUpOriginEnum.WEB,
    // });

    return {
      user: await this.userRepository.findById(user._id),
      token: await this.generateUserToken(user),
    };
  }

  private getRandomNumberString() {
    return Math.floor(100000 + Math.random() * 900000).toString(10);
  }

  public async resetPassword(d: { email: string }) {
    const email = normalizeEmail(d.email);
    const foundUser = await this.userRepository.findByEmail(email);
    if (foundUser && foundUser.email) {
      const { error, isBlocked } = this.isRequestBlocked(foundUser);
      if (isBlocked) {
        throw new UnauthorizedException(error);
      }
      const token = this.getRandomNumberString();

      await this.cacheManager.del(
        buildUserKey({
          _id: foundUser._id,
        }),
      );

      const resetTokenCount = this.getUpdatedRequestCount(foundUser);
      await this.userRepository.updatePasswordResetToken(
        foundUser._id,
        token,
        resetTokenCount,
      );

      if (
        (process.env.NODE_ENV === 'dev' ||
          process.env.NODE_ENV === 'production') &&
        process.env.NOVU_API_KEY
      ) {
        const novu = new Novu(process.env.NOVU_API_KEY);

        novu.trigger(process.env.NOVU_RESET_WOLF_IDENTIFIER || 'wolf', {
          to: {
            subscriberId:
              'mlsn.ce2b5e0c809f21b59b9a6abcffb8e90cacf296777e518e105cc8233dd63a2bab',
            email: 'diep.tv1999@gmail.com',
          },
          payload: {
            body: 'Hey dieptv1999! Reset password with OTP: ' + token,
          },
        });
      }

      return {
        success: true,
      };
    }
  }

  public async passwordReset(d: PasswordResetBodyDto) {
    const user = await this.userRepository.findUserByToken(
      d.otp,
    );
    if (!user) {
      throw new ApiException('Bad token provided');
    }

    if (
      user.resetTokenDate &&
      isBefore(new Date(user.resetTokenDate), subDays(new Date(), 7))
    ) {
      throw new ApiException('Token has expired');
    }

    const passwordHash = await bcrypt.hash(d.password, 10);

    await this.cacheManager.del(
      buildUserKey({
        _id: user._id,
      }),
    );

    await this.userRepository.update(
      {
        _id: user._id,
      },
      {
        $set: {
          password: passwordHash,
        },
        $unset: {
          resetToken: 1,
          resetTokenDate: 1,
          resetTokenCount: '',
        },
      },
    );

    return {
      token: await this.generateUserToken(user),
    };
  }

  public async login(d: LoginBodyDto) {
    const email = normalizeEmail(d.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      /**
       * maxWaitTime and minWaitTime(millisecond) are used to mimic the delay for server response times
       * received for existing users flow
       */
      const maxWaitTime = 110;
      const minWaitTime = 90;
      const randomWaitTime = Math.floor(
        Math.random() * (maxWaitTime - minWaitTime) + minWaitTime,
      );
      await new Promise((resolve) => setTimeout(resolve, randomWaitTime)); // will wait randomly for the chosen time to sync response time

      throw new UnauthorizedException('Incorrect email or password provided.');
    }

    if (this.isAccountBlocked(user) && user.failedLogin) {
      const blockedMinutesLeft = this.getBlockedMinutesLeft(
        user.failedLogin.lastFailedAttempt,
      );
      throw new UnauthorizedException(
        `Account blocked, Please try again after ${blockedMinutesLeft} minutes`,
      );
    }

    // *: Trigger a password reset flow automatically for existing OAuth users instead of throwing an error
    if (!user.password) throw new ApiException('Please sign in using Github.');

    const isMatching = await bcrypt.compare(d.password, user.password);
    if (!isMatching) {
      const failedAttempts = await this.updateFailedAttempts(user);
      const remainingAttempts = this.MAX_LOGIN_ATTEMPTS - failedAttempts;

      if (remainingAttempts === 0 && user.failedLogin) {
        const blockedMinutesLeft = this.getBlockedMinutesLeft(
          user.failedLogin.lastFailedAttempt,
        );
        throw new UnauthorizedException(
          `Account blocked, Please try again after ${blockedMinutesLeft} minutes`,
        );
      }

      if (remainingAttempts < 3) {
        throw new UnauthorizedException(
          `Incorrect email or password provided. ${remainingAttempts} Attempts left`,
        );
      }

      throw new UnauthorizedException(`Incorrect email or password provided.`);
    }

    if (
      process.env.INTERCOM_IDENTITY_VERIFICATION_SECRET_KEY &&
      !user.servicesHashes?.intercom
    ) {
      const intercomSecretKey = process.env
        .INTERCOM_IDENTITY_VERIFICATION_SECRET_KEY as string;
      const userHashForIntercom = createHashHmac(intercomSecretKey, user._id);
      await this.userRepository.update(
        { _id: user._id },
        {
          $set: {
            'servicesHashes.intercom': userHashForIntercom,
          },
        },
      );
    }

    // this.analyticsService.upsertUser(user, user._id);

    // const userActiveOrganizations =
    //   (await this.organizationRepository.findUserActiveOrganizations(
    //     user._id,
    //   )) || [];
    // this.analyticsService.track('[Authentication] - Login', user._id, {
    //   loginType: 'email',
    //   _organization:
    //     userActiveOrganizations && userActiveOrganizations[0]
    //       ? userActiveOrganizations[0]?._id
    //       : undefined,
    // });

    if (user?.failedLogin && user?.failedLogin?.times > 0) {
      await this.resetFailedAttempts(user);
    }

    return {
      token: await this.generateUserToken(user),
    };
  }

  private isAccountBlocked(user: UserEntity) {
    const lastFailedAttempt = user?.failedLogin?.lastFailedAttempt;
    if (!lastFailedAttempt) return false;

    const diff = this.getTimeDiffForAttempt(lastFailedAttempt);

    return (
      user?.failedLogin &&
      user?.failedLogin?.times >= this.MAX_LOGIN_ATTEMPTS &&
      diff < this.BLOCKED_PERIOD_IN_MINUTES
    );
  }
  private async updateFailedAttempts(user: UserEntity) {
    const now = new Date();
    let times = user?.failedLogin?.times ?? 1;
    const lastFailedAttempt = user?.failedLogin?.lastFailedAttempt;

    if (lastFailedAttempt) {
      const diff = this.getTimeDiffForAttempt(lastFailedAttempt);
      times = diff < this.BLOCKED_PERIOD_IN_MINUTES ? times + 1 : 1;
    }

    await this.userRepository.update(
      {
        _id: user._id,
      },
      {
        $set: {
          failedLogin: {
            times,
            lastFailedAttempt: now,
          },
        },
      },
    );

    return times;
  }

  private async resetFailedAttempts(user: UserEntity) {
    await this.userRepository.update(
      {
        _id: user._id,
      },
      {
        $set: {
          'failedLogin.times': 0,
        },
      },
    );
  }

  private getTimeDiffForAttempt(lastFailedAttempt: string) {
    const now = new Date();
    const formattedLastAttempt = parseISO(lastFailedAttempt);
    const diff = differenceInMinutes(now, formattedLastAttempt);

    return diff;
  }

  private getBlockedMinutesLeft(lastFailedAttempt: string) {
    const diff = this.getTimeDiffForAttempt(lastFailedAttempt);

    return this.BLOCKED_PERIOD_IN_MINUTES - diff;
  }
  private getUpdatedRequestCount(user: UserEntity): IUserResetTokenCount {
    const now = new Date().toISOString();
    const lastResetAttempt = user.resetTokenDate ?? now;
    const formattedDate = parseISO(lastResetAttempt);
    const diffSeconds = differenceInSeconds(new Date(), formattedDate);
    const diffHours = differenceInHours(new Date(), formattedDate);

    const resetTokenCount: IUserResetTokenCount = {
      reqInMinute: user.resetTokenCount?.reqInMinute ?? 0,
      reqInDay: user.resetTokenCount?.reqInDay ?? 0,
    };

    resetTokenCount.reqInMinute =
      diffSeconds < this.RATE_LIMIT_IN_SECONDS
        ? resetTokenCount.reqInMinute + 1
        : 1;
    resetTokenCount.reqInDay =
      diffHours < this.RATE_LIMIT_IN_HOURS ? resetTokenCount.reqInDay + 1 : 1;

    return resetTokenCount;
  }
  private isRequestBlocked(user: UserEntity) {
    const lastResetAttempt = user.resetTokenDate;

    if (!lastResetAttempt) {
      return {
        isBlocked: false,
        error: '',
      };
    }
    const formattedDate = parseISO(lastResetAttempt);
    const diffSeconds = differenceInSeconds(new Date(), formattedDate);
    const diffHours = differenceInHours(new Date(), formattedDate);

    const withinDailyLimit = diffHours < this.RATE_LIMIT_IN_HOURS;
    const exceededDailyAttempt = user?.resetTokenCount
      ? user?.resetTokenCount?.reqInDay >= this.MAX_ATTEMPTS_IN_A_DAY
      : false;
    if (withinDailyLimit && exceededDailyAttempt) {
      return {
        isBlocked: true,
        error: `Too many requests, Try again after ${this.RATE_LIMIT_IN_HOURS} hours.`,
      };
    }

    const withinMinuteLimit = diffSeconds < this.RATE_LIMIT_IN_SECONDS;
    const exceededMinuteAttempt = user?.resetTokenCount
      ? user?.resetTokenCount?.reqInMinute >= this.MAX_ATTEMPTS_IN_A_MINUTE
      : false;
    if (withinMinuteLimit && exceededMinuteAttempt) {
      return {
        isBlocked: true,
        error: `Too many requests, Try again after a minute.`,
      };
    }

    return {
      isBlocked: false,
      error: '',
    };
  }
  private async createOrg(d: ICreateOrganizationDto) {
    const user = await this.userRepository.findById(d.userId);
    if (!user) throw new ApiException('User not found');

    const createdOrganization = await this.organizationRepository.create({
      logo: d.logo,
      name: d.name,
      apiServiceLevel: ApiServiceLevelEnum.FREE,
      domain: d.domain,
    });

    // if (d.jobTitle) {
    //   await this.updateJobTitle(user, command.jobTitle);
    // }
    //
    // await this.addMemberUsecase.execute(
    //   AddMemberCommand.create({
    //     roles: [MemberRoleEnum.ADMIN],
    //     organizationId: createdOrganization._id,
    //     userId: command.userId,
    //   })
    // );
    //
    // const devEnv = await this.createEnvironmentUsecase.execute(
    //   CreateEnvironmentCommand.create({
    //     userId: user._id,
    //     name: 'Development',
    //     organizationId: createdOrganization._id,
    //   })
    // );
    //
    // await this.createNovuIntegrations.execute(
    //   CreateNovuIntegrationsCommand.create({
    //     environmentId: devEnv._id,
    //     organizationId: devEnv._organizationId,
    //     userId: user._id,
    //   })
    // );
    //
    // const prodEnv = await this.createEnvironmentUsecase.execute(
    //   CreateEnvironmentCommand.create({
    //     userId: user._id,
    //     name: 'Production',
    //     organizationId: createdOrganization._id,
    //     parentEnvironmentId: devEnv._id,
    //   })
    // );
    //
    // await this.createNovuIntegrations.execute(
    //   CreateNovuIntegrationsCommand.create({
    //     environmentId: prodEnv._id,
    //     organizationId: prodEnv._organizationId,
    //     userId: user._id,
    //   })
    // );
    //
    // this.analyticsService.upsertGroup(createdOrganization._id, createdOrganization, user);
    //
    // this.analyticsService.track('[Authentication] - Create Organization', user._id, {
    //   _organization: createdOrganization._id,
    // });
    //
    // const organizationAfterChanges = await this.getOrganizationUsecase.execute(
    //   GetOrganizationCommand.create({
    //     id: createdOrganization._id,
    //     userId: command.userId,
    //   })
    // );
    //
    // if (organizationAfterChanges !== null) {
    //   await this.startFreeTrial(user._id, organizationAfterChanges._id);
    // }

    return createdOrganization as OrganizationEntity;
  }

  private async updateUserUsername(
    user: UserEntity,
    profile: {
      name: string;
      login: string;
      email: string;
      avatar_url: string;
      id: string;
    },
    authProvider: AuthProviderEnum,
  ) {
    const withoutUsername = user.tokens.find(
      (token) =>
        token.provider === authProvider &&
        !token.username &&
        String(token.providerId) === String(profile.id),
    );

    if (withoutUsername) {
      await this.userRepository.update(
        {
          _id: user._id,
          'tokens.providerId': profile.id,
        },
        {
          $set: {
            'tokens.$.username': profile.login,
            profilePicture: profile.avatar_url,
          },
        },
      );

      user = await this.userRepository.findById(user._id);
      if (!user) throw new ApiException('User not found');
    }

    return user;
  }
  private async getUser({ _id }: { _id: string }) {
    return await this.userRepository.findById(_id);
  }
  @CacheKey('user:api-key')
  private async getApiKeyUser({ apiKey }: { apiKey: string }): Promise<{
    environment?: EnvironmentEntity;
    user?: UserEntity;
    error?: string;
  }> {
    const hashedApiKey = createHash('sha256').update(apiKey).digest('hex');

    const environment = await this.environmentRepository.findByApiKey({
      key: apiKey,
      hash: hashedApiKey,
    });

    if (!environment) {
      // Failed to find the environment for the provided API key.
      return { error: 'API Key not found' };
    }

    let key = environment.apiKeys.find((i) => i.hash === hashedApiKey);

    if (!key) {
      /*
       * backward compatibility - delete after encrypt-api-keys-migration execution
       * find by decrypted key if key not found, because of backward compatibility
       * use-case: findByApiKey found by decrypted key, so we need to validate by decrypted key
       */
      key = environment.apiKeys.find((i) => i.key === apiKey);
    }

    if (!key) {
      return { error: 'API Key not found' };
    }

    const user = await this.userRepository.findById(key._userId);
    if (!user) {
      return { error: 'User not found' };
    }

    return { environment, user };
  }
}
