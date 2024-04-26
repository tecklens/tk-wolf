import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { Roles } from '@tps/decorators/roles.decorator';
import { UserSession } from '@libs/utils/user.session';
import { IJwtPayload } from '@libs/shared/types';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { MemberResponseDto } from '@app/organization/dtos/member-response.dto';
import { OrganizationService } from '@app/organization/organization.service';

@Controller('org')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Organization')
@ApiExcludeController()
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Get('/')
  @Roles(MemberRoleEnum.ADMIN)
  async getAllOrg(@UserSession() user: IJwtPayload) {
    console.log('ping role');
  }

  @Get('/members')
  @ExternalApiAccessible()
  @ApiResponse(MemberResponseDto, 200, true)
  @ApiOperation({
    summary: 'Fetch all members of current organizations',
  })
  async getMember(@UserSession() user: IJwtPayload) {
    return this.organizationService.getMembers(user);
  }
}
