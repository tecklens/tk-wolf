import { BaseCommand } from '@pak/commands';
import { AuthProviderEnum } from '@config/user.enums';

export class CreateUserCommand extends BaseCommand {
  email: string;

  firstName?: string | null;

  lastName?: string | null;

  picture?: string;

  auth: {
    username?: string;
    profileId: string;
    provider: AuthProviderEnum;
    accessToken: string;
    refreshToken: string;
  };
}
