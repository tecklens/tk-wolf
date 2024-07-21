import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategyEnum } from '@wolf/stateless';

@Injectable()
export class JwtAuthGuard extends AuthGuard(PassportStrategyEnum.JWT) {}
