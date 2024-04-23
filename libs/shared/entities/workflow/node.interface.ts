import { WorkflowId } from '@libs/repositories/workflow/types';
import { NodeId } from '@libs/repositories/node/types';
import {
  Position,
  XYPosition,
} from '@libs/shared/entities/workflow/position.interface';

export interface INodeEntity {
  id?: NodeId;

  _workflowId: WorkflowId;

  position: XYPosition;
  data: any;
  type?: any;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  resizing?: boolean;
  deletable?: boolean;
  dragHandle?: string;
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
  className?: string;
  style?: string;

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
}
