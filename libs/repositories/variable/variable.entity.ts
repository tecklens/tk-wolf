import { WorkflowId } from '@libs/repositories/workflow/types';
import { IVariable, VariableId } from '@libs/repositories/variable/types';

export class VariableEntity implements IVariable {
  _id: VariableId;
  _workflowId: WorkflowId;
  type: 'string' | 'number' | 'boolean' | 'date';
  name: string;
  defaultValue?: any;
  isDefault: boolean;

  required: boolean;

  createdAt: string;
  updatedAt?: string;
}

export type VariableDBModel = VariableEntity;

export const variableWorkflowDefault: IVariable[] = [
  {
    type: 'string',
    isDefault: true,
    required: true,
    name: 'subcriberId',
  },
  {
    type: 'string',
    isDefault: true,
    required: true,
    name: 'email',
  },
  {
    type: 'string',
    isDefault: true,
    required: false,
    name: 'phone',
  },
  {
    type: 'string',
    isDefault: true,
    required: false,
    name: 'firstName',
  },
  {
    type: 'string',
    isDefault: true,
    required: false,
    name: 'lastName',
  },
];
