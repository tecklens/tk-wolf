import {
  INodeEntity,
  NodeId,
  Position,
  ProviderId,
  WorkflowId,
  XYPosition,
} from '@wolf/stateless';

export class NodeEntity implements INodeEntity {
  _id?: NodeId;
  _workflowId: WorkflowId;
  _providerId: ProviderId;

  deleted: boolean;
  connected: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
  position: XYPosition;
  data: any;
  type?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  resizing?: boolean;
  width?: number | null;
  height?: number | null;
  /** @deprecated - use `parentId` instead */
  parentNode?: string;
  parentId?: string;
  zIndex?: number;
  extent?: string;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  style?: any;
  className?: string;
}

export type NodeDBModel = NodeEntity;
