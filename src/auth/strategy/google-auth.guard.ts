import { PassportStrategyEnum } from '@wolf/stateless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(PassportStrategyEnum.GOOGLE) {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}
