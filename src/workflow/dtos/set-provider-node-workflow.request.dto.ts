import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetProviderNodeWorkflowRequestDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'Id Node is required' })
  id: string;

  @ApiProperty()
  @IsString()
  providerId: string; // * provider variant // is uuidv4

  @ApiProperty()
  @IsString()
  providerName: string; // * provider variant // is uuidv4
}
