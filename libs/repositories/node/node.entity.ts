import { INodeEntity } from '@libs/shared/entities/workflow/node.interface';
import { NodeId } from '@libs/repositories/node/types';
import { WorkflowId } from '@libs/repositories/workflow/types';
import {
  Position,
  XYPosition,
} from '@libs/shared/entities/workflow/position.interface';

export class NodeEntity implements INodeEntity {
  _id?: NodeId;
  _workflowId: WorkflowId;

  deleted: boolean;
  connected: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
  position: XYPosition;
  data: any;
  type?: any;
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
