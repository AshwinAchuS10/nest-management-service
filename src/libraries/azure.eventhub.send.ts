import { EventHubProducerClient } from '@azure/event-hubs';

// const connectionString = "Endpoint=sb://hq-poc.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=0OX4wovF760CoVhbzjmgIvEyb3qagjbqbpz806rbAg0=";
// const eventHubName = "HqEventHub";
const connectionString = `${process.env.AZURE_EVENTHUB_CONNECTION_STRING}`;
const eventHubName = `${process.env.AZURE_EVENTHUB_NAME}`;

export default async function sendEvent() {
  console.log('here in event hub');
  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(connectionString, eventHubName);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  batch.tryAdd({ body: 'First event' });
  batch.tryAdd({ body: 'Second event' });
  batch.tryAdd({ body: 'Third event' });

  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log('A batch of three events have been sent to the event hub');
}
