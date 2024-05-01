export type EmailTemplateId = string;

export interface IEmailTemplate {
  _id: EmailTemplateId;
  _userId?: string;

  name: string;
  preview: string;
  design?: any;
  deletedAt?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
