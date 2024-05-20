import { PlunkEmailProvider } from './plunk.provider';

const mockConfig = {
  apiKey: 'sample-api-key',
  senderName: "wolf's Team",
};

const mockwolfMessage = {
  from: 'test@nomail.com',
  to: ['test@nomail.com'],
  html: '<div> Mail Content </div>',
  subject: 'Test subject',
};

test('should trigger plunk library correctly', async () => {
  const provider = new PlunkEmailProvider(mockConfig);
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
  });
});
