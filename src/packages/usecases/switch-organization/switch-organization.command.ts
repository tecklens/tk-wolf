import { IsNotEmpty } from 'class-validator';
import { AuthenticatedCommand } from '@pak/commands';

export class SwitchOrganizationCommand extends AuthenticatedCommand {
  @IsNotEmpty()
  newOrganizationId: string;
}
