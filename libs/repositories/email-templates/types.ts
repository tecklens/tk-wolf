export type EmailTemplateId = string;

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
