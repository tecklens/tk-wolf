import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TriggerService } from '@app/trigger/trigger.service';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';
import { ApiResponse } from '@tps/decorators/api-response.decorator';
import { CreateTriggerDto } from '@app/trigger/dtos/create-trigger.dto';
import { CreateTriggerResponse } from '@app/trigger/dtos/create-trigger.response';
import { ApiKeyAuthGuard } from '@app/auth/strategy/apikey.guard';

@ApiBearerAuth()
@Controller('trigger')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Trigger')
@ApiExcludeController()
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Post('/')
  @ApiResponse(CreateTriggerResponse, 200)
  @ApiOperation({
    summary: 'API save trigger and exe workflow',
  })
  @UseGuards(ApiKeyAuthGuard)
  @ExternalApiAccessible()
  createTrigger(
    @Body() payload: CreateTriggerDto,
  ): Promise<CreateTriggerResponse> {
    return this.triggerService.createTrigger(payload);
  }
}
