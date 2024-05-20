import { Resend } from 'resend';

import { ResendEmailProvider } from './resend.provider';
const mockConfig = {
  apiKey: 'this-api-key-from-resend',
  from: 'test@test.com',
};

(global as any).Headers = () => {};

const mockwolfMessage = {
  from: 'test@test.com',
  to: ['test@test.com'],
  html: '<div> Mail Content </div>',
  subject: 'Test subject',
  reply_to: 'no-reply@wolf.co',
  attachments: [
    {
      mime: 'text/plain',
      file: Buffer.from('test'),
      name: 'test.txt',
    },
  ],
};

test('should trigger resend library correctly', async () => {
  const provider = new ResendEmailProvider(mockConfig);
  const spy = jest
    .spyOn(provider, 'sendMessage')
    .mockImplementation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    });

  await provider.sendMessage(mockwolfMessage);

  expect(spy).toBeCalled();
  expect(spy).toBeCalledWith({
    from: mockwolfMessage.from,
    to: mockwolfMessage.to,
    html: mockwolfMessage.html,
    subject: mockwolfMessage.subject,
    attachments: mockwolfMessage.attachments,
    reply_to: mockwolfMessage.reply_to,
  });
});

test('should trigger resend email with From Name', async () => {
  const mockConfigWithSenderName = {
    ...mockConfig,
    senderName: 'Test User',
  };

  const provider = new ResendEmailProvider(mockConfigWithSenderName);
  const spy = jest
    .spyOn((provider as any).resendClient.emails, 'send')
    .mockImplementation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    });

  await provider.sendMessage(mockwolfMessage);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith({
    from: `${mockConfigWithSenderName.senderName} <${mockwolfMessage.from}>`,
    to: mockwolfMessage.to,
    html: mockwolfMessage.html,
    subject: mockwolfMessage.subject,
    attachments: mockwolfMessage.attachments.map((attachment) => ({
      filename: attachment?.name,
      content: attachment.file,
    })),
    reply_to: null,
    cc: undefined,
    bcc: undefined,
  });
});
