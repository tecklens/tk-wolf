import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@tps/decorators/roles.decorator';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from '@libs/shared/types';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredMemberRoleEnums = this.reflector.getAllAndOverride<
      MemberRoleEnum[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredMemberRoleEnums) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    if (req.headers) {
      if (req.headers.authorization) {
        const tokenParts = req.headers.authorization.split(' ');

        if (tokenParts[0] !== 'Bearer')
          throw new UnauthorizedException('bad_token');
        if (!tokenParts[1]) throw new UnauthorizedException('bad_token');

        // @ts-ignore
        const user: IJwtPayload = jwt.decode(tokenParts[1]);

        return requiredMemberRoleEnums.some((role) =>
          user.roles?.includes(role),
        );
      } else return false;
    } else return false;
  }
}
