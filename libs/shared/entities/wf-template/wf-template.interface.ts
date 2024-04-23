import { JSONSchema7 } from 'json-schema';

import type {
  BuilderFieldType,
  BuilderGroupValues,
  TemplateVariableTypeEnum,
  FilterParts,
} from '../../types';
import { IMessageTemplate } from '../message-template';
import { IPreferenceChannels } from '../subscriber-preference';
import { IWorkflowStepMetadata } from '../step';
import { INotificationGroup } from '../notification-group';

export enum WfTemplateTypeEnum {
  REGULAR = 'REGULAR',
  ECHO = 'ECHO',
}

export interface IWfTemplate {
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

export interface IStepVariant {
  _id?: string;
  uuid?: string;
  stepId?: string;
  name?: string;
  filters?: IMessageFilter[];
  _templateId?: string;
  _parentId?: string | null;
  template?: IMessageTemplate;
  active?: boolean;
  shouldStopOnFail?: boolean;
  replyCallback?: {
    active: boolean;
    url: string;
  };
  metadata?: IWorkflowStepMetadata;
  inputs?: {
    schema: JSONSchema7;
  };
}

export interface INotificationTemplateStep extends IStepVariant {
  variants?: IStepVariant[];
}

export interface IMessageFilter {
  isNegated?: boolean;
  type?: BuilderFieldType;
  value: BuilderGroupValues;
  children: FilterParts[];
}
