import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { ApiAuthSchemeEnum, IJwtPayload } from '@libs/shared/types';
import { HttpRequestHeaderKeysEnum } from '@tps/headers.types';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        header: HttpRequestHeaderKeysEnum.AUTHORIZATION,
        prefix: `${ApiAuthSchemeEnum.API_KEY} `,
      },
      true,
      (
        apikey: string,
        verified: (err: Error | null, user?: IJwtPayload | false) => void,
      ) => {
        this.authService
          .validateApiKey(apikey)
          .then((user) => {
            if (!user) {
              return verified(null, false);
            }

            return verified(null, user);
          })
          .catch((err) => verified(err, false));
      },
    );
  }
}
