import MessageReceiver from '../util/message-receiver';

const m = new MessageReceiver();
m.bind('my-event', (data) => {
  console.log(data);
});
