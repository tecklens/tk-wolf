"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobTitleToLabelMapper = exports.JobTitleEnum = exports.ProductUseCasesEnum = exports.ApiServiceLevelEnum = void 0;
var ApiServiceLevelEnum;
(function (ApiServiceLevelEnum) {
    ApiServiceLevelEnum["FREE"] = "free";
    ApiServiceLevelEnum["BUSINESS"] = "business";
    ApiServiceLevelEnum["ENTERPRISE"] = "enterprise";
    ApiServiceLevelEnum["UNLIMITED"] = "unlimited";
})(ApiServiceLevelEnum = exports.ApiServiceLevelEnum || (exports.ApiServiceLevelEnum = {}));
var ProductUseCasesEnum;
(function (ProductUseCasesEnum) {
    ProductUseCasesEnum["IN_APP"] = "in_app";
    ProductUseCasesEnum["MULTI_CHANNEL"] = "multi_channel";
    ProductUseCasesEnum["DELAY"] = "delay";
    ProductUseCasesEnum["TRANSLATION"] = "translation";
    ProductUseCasesEnum["DIGEST"] = "digest";
})(ProductUseCasesEnum = exports.ProductUseCasesEnum || (exports.ProductUseCasesEnum = {}));
var JobTitleEnum;
(function (JobTitleEnum) {
    JobTitleEnum["ENGINEER"] = "engineer";
    JobTitleEnum["ENGINEERING_MANAGER"] = "engineering_manager";
    JobTitleEnum["ARCHITECT"] = "architect";
    JobTitleEnum["PRODUCT_MANAGER"] = "product_manager";
    JobTitleEnum["DESIGNER"] = "designer";
    JobTitleEnum["FOUNDER"] = "cxo_founder";
    JobTitleEnum["MARKETING_MANAGER"] = "marketing_manager";
    JobTitleEnum["OTHER"] = "other";
})(JobTitleEnum = exports.JobTitleEnum || (exports.JobTitleEnum = {}));
exports.jobTitleToLabelMapper = {
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