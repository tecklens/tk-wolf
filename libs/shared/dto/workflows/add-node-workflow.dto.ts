import { INodeEntity } from '@libs/shared/entities/workflow/node.interface';

export interface ICreateWorkflowDto extends INodeEntity {
  workflowId: string;
}
