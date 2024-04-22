import { Module } from '@nestjs/common';
import { WorkflowService } from '@app/workflow/workflow.service';
import { WorkflowController } from '@app/workflow/workflow.controller';

@Module({
  providers: [WorkflowService],
  exports: [WorkflowService],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
