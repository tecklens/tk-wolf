import { EnvironmentId, OrganizationId, UserId, WorkflowId } from '../../types';
import { EventTypes, NodeId, ProviderId } from '../../entities';
export type TaskId = string;
export declare enum TaskStatus {
    todo = 0,
    backlog = 1,
    in_process = 2,
    cancel = 3,
    done = 4
}
export interface ITask {
    id?: TaskId;
    _workflowId: WorkflowId;
    _userId: UserId;
    _environmentId: EnvironmentId;
    _organizationId: OrganizationId;
    workflowName: string;
    _nodeId: NodeId;
    _providerId: ProviderId;
    providerName: string;
    payload: any;
    channel: string;
    code: string;
    name: string;
    type: string;
    status: TaskStatus;
    priority: string;
    subscriberId: string;
    email: string;
    phone: string;
    errorDetail: any;
    bodyWebhook: any;
    deletedAt?: Date;
    deletedBy?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date;
}
export interface ITaskTimeline {
    _id?: TaskId;
    _taskId: TaskId;
    _userId: UserId;
    _workflowId: WorkflowId;
    event?: EventTypes;
    deletedAt?: Date;
    deletedBy?: string;
    updatedAt?: Date;
    createdAt?: Date;
    createdBy?: string;
}
