import { INodeEntity } from '../../entities';

export interface ICreateWorkflowDto extends INodeEntity {
  workflowId: string;
}
