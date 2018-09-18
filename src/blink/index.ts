import MessageReceiver from './message-receiver';

const m = new MessageReceiver();
m.bind('my-event', (data) => {
  console.log(data);
});
