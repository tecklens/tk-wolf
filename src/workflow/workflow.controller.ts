import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from '@app/auth/strategy/apikey.guard';
import { ExternalApiAccessible } from '@tps/decorators/external-api.decorator';

@ApiBearerAuth()
@Controller('wf')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Workflow')
@ApiExcludeController()
export class WorkflowController {
  @Get('/:id')
  @UseGuards(ApiKeyAuthGuard)
  @ExternalApiAccessible()
  getOne(@Param('id') id: string) {}
}
