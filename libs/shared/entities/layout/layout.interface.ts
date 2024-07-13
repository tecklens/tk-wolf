import {
  EnvironmentId,
  ITemplateVariable,
  LayoutDescription,
  LayoutId,
  LayoutIdentifier,
  LayoutName,
  OrganizationId,
  UserId,
} from '../../types';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

export interface ILayoutEntity {
  _id?: LayoutId;
  _organizationId: OrganizationId;
  _environmentId: EnvironmentId;
  _creatorId: UserId;
  _parentId?: LayoutId;
  name: LayoutName;
  identifier: LayoutIdentifier;
  channel: ChannelTypeEnum;
  content: string;
  description?: LayoutDescription;
  contentType: string;
  variables?: ITemplateVariable[];
  isDefault: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
