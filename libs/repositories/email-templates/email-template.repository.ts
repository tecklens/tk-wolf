import { BaseRepository } from '../base-repository';
import {
  EmailTemplateDBModel,
  EmailTemplateEntity,
} from './email-template.entity';
import { EmailTemplate } from '@libs/repositories/email-templates/email-template.schema';

export class EmailTemplateRepository extends BaseRepository<
  EmailTemplateDBModel,
  EmailTemplateEntity,
  object
> {
  constructor() {
    super(EmailTemplate, EmailTemplateEntity);
  }

  async findById(
    id: string,
    select?: string,
  ): Promise<EmailTemplateEntity | null> {
    const data = await this.MongooseModel.findById(id, select);
    if (!data) return null;

    return this.mapEntity(data.toObject());
  }

  async findByPage(skip = 0, limit = 10): Promise<EmailTemplateEntity[]> {
    return await this.find({}, {}, { skip: skip, limit: limit });
  }
}
