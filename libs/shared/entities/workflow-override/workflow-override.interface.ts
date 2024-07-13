import { IPreferenceChannels } from '../subscriber-preference';
import { EnvironmentId, OrganizationId, WorkflowOverrideId } from '../../types';
import { ITenantEntity } from '../tenant';
import { IWfTemplate } from '../wf-template';

export interface IWorkflowOverride {
  _id?: WorkflowOverrideId;

  _organizationId: OrganizationId;

  _environmentId: EnvironmentId;

  _workflowId: string;

  readonly workflow?: IWfTemplate;


  readonly tenant?: ITenantEntity;

  active: boolean;

  preferenceSettings: IPreferenceChannels;

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
}
