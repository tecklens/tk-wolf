import { Position, XYPosition } from './position.interface';
import { ProviderId } from '@stateless/lib/entities';
import { WorkflowId } from '@stateless/lib/types';
export type NodeId = string;
export interface INodeEntity {
    _id?: NodeId;
    _workflowId: WorkflowId;
    _providerId: ProviderId;
    position: XYPosition;
    data: any;
    type?: string;
    sourcePosition?: Position;
    targetPosition?: Position;
    hidden?: boolean;
    width?: number | null;
    height?: number | null;
    parentNode?: string;
    parentId?: string;
    zIndex?: number;
    extent?: string;
    expandParent?: boolean;
    positionAbsolute?: XYPosition;
    ariaLabel?: string;
    focusable?: boolean;
    className?: string;
    style?: any;
    deleted: boolean;
    connected: boolean;
    deletedAt?: string;
    deletedBy?: string;
    createdAt: string;
    updatedAt?: string;
}
export declare enum WfNodeType {
    starter = "starter",
    sms = "sms",
    email = "email",
    delay = "delay",
    webhook = "webhook"
}
export interface IContent {
    source: string;
    plainText: string;
}
