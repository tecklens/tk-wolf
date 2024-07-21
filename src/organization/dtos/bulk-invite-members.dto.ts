import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { IBulkInviteRequestDto } from '@wolf/stateless';

class EmailInvitee {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class BulkInviteMembersDto implements IBulkInviteRequestDto {
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => EmailInvitee)
  invitees: EmailInvitee[];
}
