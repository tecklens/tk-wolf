import { IWorkflowStepMetadata } from '../../entities/step';
import { BuilderFieldType, BuilderGroupValues, FilterParts } from '../../types';

export class StepVariantDto {
  id?: string;
  _id?: string;
  name?: string;
  uuid?: string;
  _templateId?: string;
  filters?: {
    isNegated?: boolean;
    type?: BuilderFieldType;
    value?: BuilderGroupValues;
    children?: FilterParts[];
  }[];
  active?: boolean;
  shouldStopOnFail?: boolean;
  replyCallback?: {
    active: boolean;
    url?: string;
  };
  metadata?: IWorkflowStepMetadata;
}

export class NotificationStepDto extends StepVariantDto {
  variants?: StepVariantDto[];
}
