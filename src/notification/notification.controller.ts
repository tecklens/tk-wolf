import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { NotificationService } from '@app/notification/notification.service';
import { UserSession } from '@libs/utils/user.session';
import { NotificationsRequestDto } from './dtos';
import { IJwtPayload } from '@wolfxlabs/stateless';

@ApiBearerAuth()
@Controller('notification')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Notification')
@ApiExcludeController()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getListNotification(
    @UserSession() user: IJwtPayload,
    @Query() params: NotificationsRequestDto,
  ) {
    return this.notificationService.getListNotification(user, params);
  }

  @Put('/mark-all')
  @UseGuards(JwtAuthGuard)
  markAllNotification(@UserSession() user: IJwtPayload) {
    return this.notificationService.markAll(user);
  }

  @Put('/mark/:id')
  @UseGuards(JwtAuthGuard)
  markNotification(@UserSession() user: IJwtPayload, @Param('id') id: string) {
    return this.notificationService.mark(user, id);
  }
}
