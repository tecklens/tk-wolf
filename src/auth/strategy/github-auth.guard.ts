import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategyEnum } from '@wolfxlabs/stateless';

@Injectable()
export class GitHubAuthGuard extends AuthGuard(PassportStrategyEnum.GITHUB) {}
