import { MandrillProvider } from './mandrill.provider';

const mockConfig = {
  apiKey: 'API_KEY',
  from: 'test@test.com',
  senderName: 'Test Sender',
};

test('should trigger mandrill correctly', async () => {
  const provider = new MandrillProvider(mockConfig);
  const spy = jest
    // eslint-disable-next-line @typescript-eslint/dot-notation
    .spyOn(provider['transporter'].messages, 'send')
    .mockImplementation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return [{}] as any;
    });
  const mockwolfMessage = {
    to: ['test2@test.com'],
    subject: 'test subject',
    html: '<div> Mail Content </div>',
    attachments: [
      {
        mime: 'text/plain',
        file: Buffer.from('test'),
        name: 'test.txt',
      },
    ],
  };

  await provider.sendMessage(mockwolfMessage);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith({
    message: {
      from_email: mockConfig.from,
      from_name: mockConfig.senderName,
      subject: mockwolfMessage.subject,
      html: mockwolfMessage.html,
      to: [
        {
          email: mockwolfMessage.to[0],
          type: 'to',
        },
      ],
      attachments: [
        {
          content: Buffer.from('test').toString('base64'),
          type: 'text/plain',
          name: 'test.txt',
        },
      ],
    },
  });
});

test('should check provider integration correctly', async () => {
  const provider = new MandrillProvider(mockConfig);
  const spy = jest
    // eslint-disable-next-line @typescript-eslint/dot-notation
    .spyOn(provider['transporter'].users, 'ping')
    .mockImplementation(async () => {
      return 'PONG!';
    });

  const response = await provider.checkIntegration();
  expect(spy).toHaveBeenCalled();
  expect(response.success).toBe(true);
});
