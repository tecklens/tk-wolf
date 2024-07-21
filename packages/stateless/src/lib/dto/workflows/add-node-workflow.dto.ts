import { INodeEntity } from '@stateless/lib/entities/workflow/node.interface';

export interface ICreateWorkflowDto extends INodeEntity {
  workflowId: string;
}
