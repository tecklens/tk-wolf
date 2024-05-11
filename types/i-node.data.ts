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

  // * delay node
  delayTime?: number;
  period?: number;

  // webhook
  webhookUrl: string;
  method: 'put' | 'post' | 'get' | 'delete' | 'patch';
}
