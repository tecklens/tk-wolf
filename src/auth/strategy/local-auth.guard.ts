import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategyEnum } from '@libs/shared/types';

@Injectable()
export class LocalAuthGuard extends AuthGuard(PassportStrategyEnum.LOCAL) {}
