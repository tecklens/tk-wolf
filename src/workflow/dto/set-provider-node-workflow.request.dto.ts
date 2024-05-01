import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateWorkflowDto } from '@libs/shared/dto';

export class SetProviderNodeWorkflowRequestDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'Id Node is required' })
  id: string;

  @ApiProperty()
  @IsString()
  providerId: string; // * provider variant // is uuidv4
}
