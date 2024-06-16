import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from '@app/subscription/subscription.service';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { JwtAuthGuard } from '@app/auth/strategy/jwt-auth.guard';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { IJwtPayload } from '@libs/shared/types';
import { CreateChannelRequest } from '@app/subscription/dtos/create-channel.request';
import { ChannelEntity } from '@libs/repositories/channel/channel.entity';
import { UserSession } from '@libs/utils/user.session';
import { CreateSubscriptionsRequest } from '@app/subscription/dtos/create-subscriptions.request';
import { SubscriptionEntity } from '@libs/repositories/subscription/subscription.entity';
import { GetSubscriptionResponse } from '@app/subscription/dtos/get-subscription.response';
import { GetSubscriptionsRequest } from '@app/subscription/dtos/get-subscriptions.request';
import { DelSubscriptionRequest } from "@app/subscription/dtos/del-subscription.request";

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
    @Body() payload: CreateSubscriptionsRequest,
  ) {
    return this.sub.createSubscriptions(user, payload);
  }

  @Get('/')
  @ApiResponse(SubscriptionEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getSubscription(
    @UserSession() user: IJwtPayload,
    @Query('channel_id') channelId: string,
    @Query() payload: GetSubscriptionsRequest,
  ) {
    return this.sub.getSubscriptions(user, channelId, payload);
  }

  @Get('/all')
  @ApiResponse(GetSubscriptionResponse)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getAllSubscriptionOfUser(
    @UserSession() user: IJwtPayload,
    @Query() payload: GetSubscriptionsRequest,
  ) {
    return this.sub.getAllSubscriptionOfUser(user, payload);
  }

  @Get('/channel')
  @ApiResponse(SubscriptionEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  getChannel(
    @UserSession() user: IJwtPayload,
    @Query() payload: GetSubscriptionsRequest,
  ) {
    return this.sub.getChannel(user, payload);
  }

  @Delete('/')
  @ApiResponse(SubscriptionEntity)
  @UseGuards(JwtAuthGuard)
  @ExternalApiAccessible()
  delSubscription(
    @UserSession() user: IJwtPayload,
    @Query() payload: DelSubscriptionRequest,
  ) {
    return this.sub.delSubscription(user, payload);
  }
}
