import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChangePassDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  password: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  changePasswordTransactionId: string;
}
