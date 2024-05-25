import {
  EmailTemplateId,
  IEmailTemplate,
} from '@libs/repositories/email-templates/types';

export class EmailTemplateEntity implements IEmailTemplate {
  _id: EmailTemplateId;
  _userId?: string;
  preview: string;
  name: string;
  identifier: string;
  design?: any;
  free: boolean;

  deletedAt?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type EmailTemplateDBModel = EmailTemplateEntity;
