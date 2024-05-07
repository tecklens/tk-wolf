import { WorkflowId } from '@libs/repositories/workflow/types';
import { IVariable, VariableId } from '@libs/repositories/variable/types';

export class VariableEntity implements IVariable {
  _id: VariableId;
  _workflowId: WorkflowId;
  type: 'string' | 'number' | 'boolean' | 'date';
  name: string;
  defaultValue?: any;
  isDefault: boolean;

  createdAt: string;
  updatedAt?: string;
}

export type VariableDBModel = VariableEntity;
