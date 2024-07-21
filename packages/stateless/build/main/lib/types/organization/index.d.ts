export type OrganizationId = string;
export type BrandId = string;
export declare enum ApiServiceLevelEnum {
    FREE = "free",
    BUSINESS = "business",
    ENTERPRISE = "enterprise",
    UNLIMITED = "unlimited"
}
export declare enum ProductUseCasesEnum {
    IN_APP = "in_app",
    MULTI_CHANNEL = "multi_channel",
    DELAY = "delay",
    TRANSLATION = "translation",
    DIGEST = "digest"
}
export declare enum JobTitleEnum {
    ENGINEER = "engineer",
    ENGINEERING_MANAGER = "engineering_manager",
    ARCHITECT = "architect",
    PRODUCT_MANAGER = "product_manager",
    DESIGNER = "designer",
    FOUNDER = "cxo_founder",
    MARKETING_MANAGER = "marketing_manager",
    OTHER = "other"
}
export declare const jobTitleToLabelMapper: {
    engineer: string;
    architect: string;
    product_manager: string;
    designer: string;
    engineering_manager: string;
    cxo_founder: string;
    marketing_manager: string;
    other: string;
};
