/// <reference types="node" />
import { CheckIntegrationResponseEnum } from './provider.enum';
import { EnvironmentId, OrganizationId } from '../../types';
import { ICredentials } from '../../entities';
export type ProviderId = string;
export interface IProvider {
    _id?: ProviderId;
    _environmentId: EnvironmentId;
    _organizationId: OrganizationId;
    providerId: string;
    channel: ChannelTypeEnum;
    credentials: ICredentials;
    active: boolean;
    name: string;
    identifier: string;
    priority?: number;
    primary: boolean;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
}
export declare enum ChannelTypeEnum {
    EMAIL = "email",
    IN_APP = "in_app",
    SMS = "sms",
    CHAT = "chat",
    PUSH = "push",
    WEBHOOK = "webhook",
    DELAY = "delay"
}
export interface IAttachmentOptions {
    mime: string;
    file: Buffer | null;
    name?: string;
    channels?: ChannelTypeEnum[];
    cid?: string;
    disposition?: string;
}
export interface IProviderChannel {
    id: string;
    channelType: ChannelTypeEnum;
}
export interface IEmailOptions {
    to: string[];
    subject: string;
    html: string;
    from?: string;
    text?: string;
    attachments?: IAttachmentOptions[];
    id?: string;
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
    payloadDetails?: any;
    notificationDetails?: any;
    ipPoolName?: string;
    customData?: Record<string, any>;
    senderName?: string;
}
export interface ISmsOptions {
    to: string;
    content: string;
    from?: string;
    attachments?: IAttachmentOptions[];
    id?: string;
    customData?: Record<string, any>;
}
export interface IPushOptions {
    target: string[];
    title: string;
    content: string;
    payload: object;
    overrides?: {
        type?: 'notification' | 'data';
        data?: {
            [key: string]: string;
        };
        tag?: string;
        body?: string;
        icon?: string;
        badge?: number;
        color?: string;
        sound?: string;
        title?: string;
        bodyLocKey?: string;
        bodyLocArgs?: string;
        clickAction?: string;
        titleLocKey?: string;
        titleLocArgs?: string;
        ttl?: number;
        expiration?: number;
        priority?: 'default' | 'normal' | 'high';
        subtitle?: string;
        channelId?: string;
        categoryId?: string;
        mutableContent?: boolean;
        android?: {
            [key: string]: {
                [key: string]: string;
            } | string;
        };
        apns?: {
            headers?: {
                [key: string]: string;
            };
            payload: {
                aps: {
                    [key: string]: {
                        [key: string]: string;
                    } | string;
                };
            };
        };
        fcmOptions?: {
            analyticsLabel?: string;
        };
    };
    subscriber: object;
    step: {
        digest: boolean;
        events: object[] | undefined;
        total_count: number | undefined;
    };
}
export interface IChatOptions {
    webhookUrl: string;
    channel?: string;
    content: string;
    blocks?: IBlock[];
    baseUrl?: string;
    token?: string;
    testEnvironment?: boolean;
    chatId?: string;
}
export interface IBlock {
    type: 'section' | 'header';
    text: {
        type: 'mrkdwn';
        text: string;
    };
}
export interface ISendMessageSuccessResponse {
    id?: string;
    ids?: string[];
    date?: string;
}
export interface IEventBody {
    status: EmailEventStatusEnum | SmsEventStatusEnum;
    date: string;
    externalId?: string;
    attempts?: number;
    response?: string;
    row?: string;
}
export interface IEmailEventBody extends IEventBody {
    status: EmailEventStatusEnum;
}
export interface ISMSEventBody extends IEventBody {
    status: SmsEventStatusEnum;
}
export interface IEmailProvider extends IProviderChannel {
    channelType: ChannelTypeEnum.EMAIL;
    sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;
    getMessageId?: (body: any | any[]) => string[];
    parseEventBody?: (body: any | any[], identifier: string) => IEmailEventBody | undefined;
    checkIntegration(options: IEmailOptions): Promise<ICheckIntegrationResponse>;
}
export interface ISmsProvider extends IProviderChannel {
    sendMessage(options: ISmsOptions): Promise<ISendMessageSuccessResponse>;
    channelType: ChannelTypeEnum.SMS;
    getMessageId?: (body: any) => string[];
    parseEventBody?: (body: any | any[], identifier: string) => ISMSEventBody | undefined;
}
export interface IChatProvider extends IProviderChannel {
    sendMessage(options: IChatOptions): Promise<ISendMessageSuccessResponse>;
    channelType: ChannelTypeEnum.CHAT;
}
export interface IPushProvider extends IProviderChannel {
    sendMessage(options: IPushOptions): Promise<ISendMessageSuccessResponse>;
    channelType: ChannelTypeEnum.PUSH;
}
export interface ICheckIntegrationResponse {
    success: boolean;
    message: string;
    code: CheckIntegrationResponseEnum;
}
export interface IEmailOptions {
    to: string[];
    subject: string;
    html: string;
    from?: string;
    text?: string;
    attachments?: IAttachmentOptions[];
    id?: string;
    replyTo?: string;
    cc?: string[];
    bcc?: string[];
    payloadDetails?: any;
    notificationDetails?: any;
    ipPoolName?: string;
    customData?: Record<string, any>;
    senderName?: string;
}
export interface ISmsOptions {
    to: string;
    content: string;
    from?: string;
    attachments?: IAttachmentOptions[];
    id?: string;
    customData?: Record<string, any>;
}
export interface IPushOptions {
    target: string[];
    title: string;
    content: string;
    payload: object;
    overrides?: {
        type?: 'notification' | 'data';
        data?: {
            [key: string]: string;
        };
        tag?: string;
        body?: string;
        icon?: string;
        badge?: number;
        color?: string;
        sound?: string;
        title?: string;
        bodyLocKey?: string;
        bodyLocArgs?: string;
        clickAction?: string;
        titleLocKey?: string;
        titleLocArgs?: string;
        ttl?: number;
        expiration?: number;
        priority?: 'default' | 'normal' | 'high';
        subtitle?: string;
        channelId?: string;
        categoryId?: string;
        mutableContent?: boolean;
        android?: {
            [key: string]: {
                [key: string]: string;
            } | string;
        };
        apns?: {
            headers?: {
                [key: string]: string;
            };
            payload: {
                aps: {
                    [key: string]: {
                        [key: string]: string;
                    } | string;
                };
            };
        };
        fcmOptions?: {
            analyticsLabel?: string;
        };
    };
    subscriber: object;
    step: {
        digest: boolean;
        events: object[] | undefined;
        total_count: number | undefined;
    };
}
export declare enum EmailEventStatusEnum {
    OPENED = "opened",
    REJECTED = "rejected",
    SENT = "sent",
    DEFERRED = "deferred",
    DELIVERED = "delivered",
    BOUNCED = "bounced",
    DROPPED = "dropped",
    CLICKED = "clicked",
    BLOCKED = "blocked",
    SPAM = "spam",
    UNSUBSCRIBED = "unsubscribed",
    DELAYED = "delayed",
    COMPLAINT = "complaint"
}
export declare enum SmsEventStatusEnum {
    CREATED = "created",
    DELIVERED = "delivered",
    ACCEPTED = "accepted",
    QUEUED = "queued",
    SENDING = "sending",
    SENT = "sent",
    FAILED = "failed",
    UNDELIVERED = "undelivered",
    REJECTED = "rejected"
}
export interface IEventBody {
    status: EmailEventStatusEnum | SmsEventStatusEnum;
    date: string;
    externalId?: string;
    attempts?: number;
    response?: string;
    row?: string;
}
export interface IEmailEventBody extends IEventBody {
    status: EmailEventStatusEnum;
}
export interface ISMSEventBody extends IEventBody {
    status: SmsEventStatusEnum;
}
export interface IEmailProvider extends IProviderChannel {
    channelType: ChannelTypeEnum.EMAIL;
    sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;
    getMessageId?: (body: any | any[]) => string[];
    parseEventBody?: (body: any | any[], identifier: string) => IEmailEventBody | undefined;
    checkIntegration(options: IEmailOptions): Promise<ICheckIntegrationResponse>;
}
export interface ISmsProvider extends IProviderChannel {
    sendMessage(options: ISmsOptions): Promise<ISendMessageSuccessResponse>;
    channelType: ChannelTypeEnum.SMS;
    getMessageId?: (body: any) => string[];
    parseEventBody?: (body: any | any[], identifier: string) => ISMSEventBody | undefined;
}
export interface IChatProvider extends IProviderChannel {
    sendMessage(options: IChatOptions): Promise<ISendMessageSuccessResponse>;
    channelType: ChannelTypeEnum.CHAT;
}
export interface IPushProvider extends IProviderChannel {
    sendMessage(options: IPushOptions): Promise<ISendMessageSuccessResponse>;
    channelType: ChannelTypeEnum.PUSH;
}
export interface ICheckIntegrationResponse {
    success: boolean;
    message: string;
    code: CheckIntegrationResponseEnum;
}
