export class StepVariantDto {
    id;
    _id;
    name;
    uuid;
    _templateId;
    filters;
    active;
    shouldStopOnFail;
    replyCallback;
}
export class NotificationStepDto extends StepVariantDto {
    variants;
}
//# sourceMappingURL=workflow.dto.js.map