import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as githubPassport from 'passport-github2';
import {
  Metadata,
  StateStoreStoreCallback,
  StateStoreVerifyCallback,
} from 'passport-oauth2';
import { AuthProviderEnum } from '@libs/shared/entities/user';
import { AuthService } from '@app/auth/auth.service';
import { PassportStrategyEnum } from "@libs/shared/types";

@Injectable()
export class GitHubStrategy extends PassportStrategy(
  githubPassport.Strategy,
  PassportStrategyEnum.GITHUB,
) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.API_ROOT_URL + '/v1/auth/github/callback',
      scope: ['user:email'],
      passReqToCallback: true,
      store: {
        verify(
          req,
          state: string,
          meta: Metadata,
          callback: StateStoreVerifyCallback,
        ) {
          callback(null, true, JSON.stringify(req.query));
        },
        store(req, meta: Metadata, callback: StateStoreStoreCallback) {
          callback(null, JSON.stringify(req.query));
        },
      },
    });
  }

  async validate(
    req,
    accessToken: string,
    refreshToken: string,
    githubProfile,
    done: (err, data) => void,
  ) {
    console.log('accessToken' + accessToken);
    try {
      const profile = {
        ...githubProfile._json,
        email: githubProfile.emails[0].value,
      };
      const parsedState = this.parseState(req);

      const response = await this.authService.authenticate(
        AuthProviderEnum.GITHUB,
        accessToken,
        refreshToken,
        profile,
        parsedState?.distinctId,
        parsedState?.source,
      );

      done(null, {
        token: response.token,
        newUser: response.newUser,
      });
    } catch (err) {
      done(err, false);
    }
  }

  private parseState(req) {
    try {
      return JSON.parse(req.query.state);
    } catch (e) {
      return {};
    }
  }
}
