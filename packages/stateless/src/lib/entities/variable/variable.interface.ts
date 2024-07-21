import { VariableId, WorkflowId } from '@stateless/lib/types';

export interface IVariable {
  _id?: VariableId;
  _workflowId?: WorkflowId;
  type: 'string' | 'number' | 'boolean' | 'date';
  name: string;
  defaultValue?: any;
  isDefault: boolean;

  required: boolean;

  createdAt?: string;
  updatedAt?: string;
}
