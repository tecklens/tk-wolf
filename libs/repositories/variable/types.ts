import { WorkflowId } from '../workflow/types';

export type VariableId = string;

export interface IVariable {
  _id: VariableId;
  _workflowId: WorkflowId;
  type: 'string' | 'number' | 'boolean' | 'date';
  name: string;
  defaultValue?: any;
  isDefault: boolean;

  createdAt: string;
  updatedAt?: string;
}
