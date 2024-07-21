import { IEdgeEntity, NodeId, WorkflowId } from '@wolfxlabs/stateless';

export class EdgeEntity implements IEdgeEntity {
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
  data?: any;
  className?: string;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  updatable?: any;

  deleted: boolean;

  deletedAt?: string;

  deletedBy?: string;

  createdAt: string;

  updatedAt?: string;
}

export type EdgeDBModel = EdgeEntity;
