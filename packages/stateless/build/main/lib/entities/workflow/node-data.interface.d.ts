export interface INodeData {
    connected: boolean;
    _providerId: string;
    providerName: string;
    _workflowId: string;
    subject: string;
    sender: string;
    design: any;
    designHtml: string;
    onDelete: (id: string) => void;
    delayTime?: number;
    period?: number;
    webhookUrl: string;
    method: 'put' | 'post' | 'get' | 'delete' | 'patch';
}
