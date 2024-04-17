import { IsNotEmpty } from 'class-validator';
import { OrganizationCommand } from '@pak/commands';

export class SwitchEnvironmentCommand extends OrganizationCommand {
  @IsNotEmpty()
  newEnvironmentId: string;
}
