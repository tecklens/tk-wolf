import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from '@app/subscription/subscription.service';
import { JwtAuthGuard } from '@app/auth/strategy';
import { ChannelEntity } from '@libs/repositories/channel';
import { UserSession } from '@libs/utils/user.session';
import {
  ApiResponse,
  ExternalApiAccessible,
  IJwtPayload,
} from '@wolfxlabs/stateless';
import {
  CreateChannelRequest,
  CreateSubscribersRequest,
  DelSubscriptionRequest,
  GetSubscriberResponse,
  GetSubscribersRequest,
} from './dtos';
import { SubscriberEntity } from '@libs/repositories/subscriber';

@Controller('sub')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Subscription')
@ApiExcludeController()
export class SubscriptionController {
  constructor(private readonly sub: SubscriptionService) {}

  @Post('/channel')
  @ApiResponse(ChannelEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  createChannel(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateChannelRequest,
  ) {
    return this.sub.createChannel(user, payload);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  createSubscription(
    @UserSession() user: IJwtPayload,
    @Body() payload: CreateSubscribersRequest,
  ) {
    return this.sub.createSubscriptions(user, payload);
  }

  @Get('/')
  @ApiResponse(SubscriberEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getSubscription(
    @UserSession() user: IJwtPayload,
    @Query('channel_id') channelId: string,
    @Query() payload: GetSubscribersRequest,
  ) {
    return this.sub.getSubscriptions(user, channelId, payload);
  }

  @Get('/all')
  @ApiResponse(GetSubscriberResponse)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getAllSubscriptionOfUser(
    @UserSession() user: IJwtPayload,
    @Query() payload: GetSubscribersRequest,
  ) {
    return this.sub.getAllSubscriptionOfUser(user, payload);
  }

  @Get('/channel')
  @ApiResponse(SubscriberEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getChannels(
    @UserSession() user: IJwtPayload,
    @Query() payload: GetSubscribersRequest,
  ) {
    return this.sub.getChannels(user, payload);
  }

  @Get('/channel/:id')
  @ApiResponse(SubscriberEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getChannel(@UserSession() user: IJwtPayload, @Param('id') channelId: string) {
    return this.sub.getChannel(user, channelId);
  }

  @Delete('/')
  @ApiResponse(SubscriberEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  delSubscription(
    @UserSession() user: IJwtPayload,
    @Query() payload: DelSubscriptionRequest,
  ) {
    return this.sub.delSubscription(user, payload);
  }
}
