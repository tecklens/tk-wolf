import type {
  BuilderFieldType,
  BuilderGroupValues,
  EmailTemplateId,
  FilterParts,
  TemplateVariableTypeEnum,
} from '../../types';

export enum WfTemplateTypeEnum {
  REGULAR = 'REGULAR',
  ECHO = 'ECHO',
}

export interface IWorkflowTemplate {
  _id?: string;
  name: string;
  description?: string;
  _environmentId: string;
  tags: string[];
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  type?: WfTemplateTypeEnum;
  payloadSchema?: any;
}

export enum TriggerTypeEnum {
  EVENT = 'event',
}

export interface IWfTrigger {
  type: TriggerTypeEnum;
  identifier: string;
  variables: IWfTriggerVariable[];
  subscriberVariables?: IWfTriggerVariable[];
  reservedVariables?: ITriggerReservedVariable[];
}

export enum TriggerContextTypeEnum {
  TENANT = 'tenant',
  ACTOR = 'actor',
}

export interface ITriggerReservedVariable {
  type: TriggerContextTypeEnum;
  variables: IWfTriggerVariable[];
}

export interface IWfTriggerVariable {
  name: string;
  value?: any;
  type?: TemplateVariableTypeEnum;
}

export interface IMessageFilter {
  isNegated?: boolean;
  type?: BuilderFieldType;
  value: BuilderGroupValues;
  children: FilterParts[];
}

export interface IEmailTemplate {
  _id: EmailTemplateId;
  _userId?: string;

  name: string;
  identifier: string;
  preview: string;
  design?: any;
  free: boolean;

  deletedAt?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
