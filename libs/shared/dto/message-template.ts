import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  ActorTypeEnum,
  IEmailBlock,
  ITemplateVariable,
  StepTypeEnum,
} from '@libs/shared/types';
import { MessageTemplateContentType } from '@libs/shared/entities/message-template';
import { IMessageCTA } from '@libs/shared/entities/messages';

export class MessageTemplate {
  @IsOptional()
  @IsEnum(StepTypeEnum)
  type: StepTypeEnum;

  @IsOptional()
  variables?: ITemplateVariable[];

  @IsDefined()
  content: string | IEmailBlock[];

  @IsOptional()
  contentType?: MessageTemplateContentType;

  @IsOptional()
  @ValidateNested()
  cta?: IMessageCTA;

  @IsOptional()
  @IsString()
  feedId?: string;

  @IsOptional()
  layoutId?: string | null;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  preheader?: string;

  @IsOptional()
  @IsString()
  senderName?: string;

  @IsOptional()
  actor?: {
    type: ActorTypeEnum;
    data: string | null;
  };

  @IsOptional()
  _creatorId?: string;
}
