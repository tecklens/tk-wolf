import { IsArray, IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateWorkflowDto } from '@wolfxlabs/stateless';

export class CreateWorkflowRequestDto implements ICreateWorkflowDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
