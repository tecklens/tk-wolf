import { NodeId } from './node.interface';
import { WorkflowId } from '../../types';

export interface IEdgeEntity {
  id?: NodeId;

  _workflowId: WorkflowId;

  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  style?: any;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  data?: any;
  className?: string;
  selected?: boolean;
  markerStart?: any;
  markerEnd?: any;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  focusable?: boolean;
  updatable?: any;

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
}
