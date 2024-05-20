import { SparkPostEmailProvider } from './sparkpost.provider';

const mockConfig = {
  apiKey:
    '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',
  region: undefined,
  from: 'test@test.com',
  senderName: 'test',
};

const mockwolfMessage = {
  from: 'test@test.com',
  to: ['test@test.com'],
  html: '<div> Mail Content </div>',
  subject: 'Test subject',
  attachments: [
    { mime: 'text/plain', file: Buffer.from('dGVzdA=='), name: 'test.txt' },
  ],
};

test('should trigger sendinblue library correctly', async () => {
  const provider = new SparkPostEmailProvider(mockConfig);
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
    attachments: [
      {
        mime: mockwolfMessage.attachments[0].mime,
        file: mockwolfMessage.attachments[0].file,
        name: mockwolfMessage.attachments[0].name,
      },
    ],
  });
});
