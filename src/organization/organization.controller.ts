import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { UserSession } from '@libs/utils/user.session';
import { BrandEntity } from '@libs/repositories/brand';
import { OrganizationService } from './organization.service';
import {
  ApiResponse,
  ExternalApiAccessible,
  IGetInviteResponseDto,
  IJwtPayload,
  MemberRoleEnum,
  Roles,
} from '@wolfxlabs/stateless';
import {
  InviteMemberDto,
  MemberResponseDto,
  ResendInviteDto,
  UpdateBrandDto,
} from './dtos';

@Controller('org')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Organization')
@ApiExcludeController()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Get('/')
  @UseGuards(JwtAuthGuard)
  @Roles(MemberRoleEnum.ADMIN)
  async getAllOrg(@UserSession() user: IJwtPayload) {
    return this.organizationService.getOrganizations(user);
  }

  @Get('/members')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  @ApiResponse(MemberResponseDto, 200, true)
  @ApiOperation({
    summary: 'Fetch all members of current organizations',
  })
  async getMember(@UserSession() user: IJwtPayload) {
    return this.organizationService.getMembers(user);
  }

  @Delete('/member/:id')
  @Roles(MemberRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  @ApiResponse(MemberResponseDto, 200, true)
  @ApiOperation({
    summary: 'Fetch all members of current organizations',
  })
  async delMember(@UserSession() user: IJwtPayload, @Param('id') id: string) {
    return this.organizationService.delMember(user, id);
  }

  @Post('/invite')
  @Roles(MemberRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard)
  async inviteMember(
    @UserSession() user: IJwtPayload,
    @Body() body: InviteMemberDto,
  ): Promise<{ success: boolean }> {
    await this.organizationService.inviteMember(user, body);

    return {
      success: true,
    };
  }

  @Post('/invite/resend')
  @Roles(MemberRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard)
  async resendInviteMember(
    @UserSession() user: IJwtPayload,
    @Body() body: ResendInviteDto,
  ): Promise<{ success: boolean }> {
    await this.organizationService.resendInviteMember(user, body);

    return {
      success: true,
    };
  }

  @Get('/invite/:token')
  @ExternalApiAccessible()
  async getInviteData(
    @Param('token') inviteToken: string,
  ): Promise<IGetInviteResponseDto> {
    return await this.organizationService.getInviteInfo(inviteToken);
  }

  @Post('/invite/:token/accept')
  @UseGuards(JwtAuthGuard)
  async acceptInviteToken(
    @UserSession() user: IJwtPayload,
    @Param('token') inviteToken: string,
  ): Promise<string> {
    return this.organizationService.acceptInviteMember(user, inviteToken);
  }

  @Put('/brand')
  @ExternalApiAccessible()
  @ApiResponse(UpdateBrandDto)
  @ApiOperation({
    summary: 'Update organization brand',
  })
  @UseGuards(JwtAuthGuard)
  async updateBrand(
    @UserSession() user: IJwtPayload,
    @Body() body: UpdateBrandDto,
  ) {
    return this.organizationService.updateBrand(user, body);
  }

  @Get('/brand')
  @ExternalApiAccessible()
  @ApiResponse(BrandEntity)
  @ApiOperation({
    summary: 'Update organization brand',
  })
  @UseGuards(JwtAuthGuard)
  async getBrand(@UserSession() user: IJwtPayload) {
    return this.organizationService.getBrand(user);
  }
}
