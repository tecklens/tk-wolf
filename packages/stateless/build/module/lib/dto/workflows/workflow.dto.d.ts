import { BuilderFieldType, BuilderGroupValues, FilterParts } from '../../types';
export declare class StepVariantDto {
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
}
export declare class NotificationStepDto extends StepVariantDto {
    variants?: StepVariantDto[];
}
