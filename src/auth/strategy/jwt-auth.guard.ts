import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategyEnum } from '@libs/shared/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard(PassportStrategyEnum.JWT) {}
