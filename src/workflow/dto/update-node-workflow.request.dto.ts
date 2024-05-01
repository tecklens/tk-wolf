import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateWorkflowDto } from '@libs/shared/dto';

export class UpdateNodeWorkflowRequestDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'Id Node is required' })
  id: string;

  @IsOptional()
  @ApiPropertyOptional()
  data: any;
}
