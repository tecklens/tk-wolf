import { Module } from '@nestjs/common';
import { WorkflowService } from '@app/workflow/workflow.service';
import { WorkflowController } from '@app/workflow/workflow.controller';
import { WorkflowRepository } from '@libs/repositories/workflow/workflow.repository';
import { NodeRepository } from '@libs/repositories/node/node.repository';
import { EdgeRepository } from '@libs/repositories/edge/edge.repository';
import { EmailTemplateRepository } from '@libs/repositories/email-templates/email-template.repository';
import { VariableRepository } from '@libs/repositories/variable/variable.repository';

@Module({
  providers: [
    WorkflowService,
    WorkflowRepository,
    NodeRepository,
    EdgeRepository,
    EmailTemplateRepository,
    VariableRepository,
  ],
  exports: [WorkflowService],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
