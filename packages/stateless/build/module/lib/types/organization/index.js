export var ApiServiceLevelEnum;
(function (ApiServiceLevelEnum) {
    ApiServiceLevelEnum["FREE"] = "free";
    ApiServiceLevelEnum["BUSINESS"] = "business";
    ApiServiceLevelEnum["ENTERPRISE"] = "enterprise";
    ApiServiceLevelEnum["UNLIMITED"] = "unlimited";
})(ApiServiceLevelEnum || (ApiServiceLevelEnum = {}));
export var ProductUseCasesEnum;
(function (ProductUseCasesEnum) {
    ProductUseCasesEnum["IN_APP"] = "in_app";
    ProductUseCasesEnum["MULTI_CHANNEL"] = "multi_channel";
    ProductUseCasesEnum["DELAY"] = "delay";
    ProductUseCasesEnum["TRANSLATION"] = "translation";
    ProductUseCasesEnum["DIGEST"] = "digest";
})(ProductUseCasesEnum || (ProductUseCasesEnum = {}));
export var JobTitleEnum;
(function (JobTitleEnum) {
    JobTitleEnum["ENGINEER"] = "engineer";
    JobTitleEnum["ENGINEERING_MANAGER"] = "engineering_manager";
    JobTitleEnum["ARCHITECT"] = "architect";
    JobTitleEnum["PRODUCT_MANAGER"] = "product_manager";
    JobTitleEnum["DESIGNER"] = "designer";
    JobTitleEnum["FOUNDER"] = "cxo_founder";
    JobTitleEnum["MARKETING_MANAGER"] = "marketing_manager";
    JobTitleEnum["OTHER"] = "other";
})(JobTitleEnum || (JobTitleEnum = {}));
export const jobTitleToLabelMapper = {
    [JobTitleEnum.ENGINEER]: 'Engineer',
    [JobTitleEnum.ARCHITECT]: 'Architect',
    [JobTitleEnum.PRODUCT_MANAGER]: 'Product Manager',
    [JobTitleEnum.DESIGNER]: 'Designer',
    [JobTitleEnum.ENGINEERING_MANAGER]: 'Engineering Manager',
    [JobTitleEnum.FOUNDER]: 'CXO Founder',
    [JobTitleEnum.MARKETING_MANAGER]: 'Marketing Manager',
    [JobTitleEnum.OTHER]: 'Other',
};
//# sourceMappingURL=index.js.map