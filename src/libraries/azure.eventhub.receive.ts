import { EventHubConsumerClient, earliestEventPosition } from '@azure/event-hubs';
import { ContainerClient } from '@azure/storage-blob';
import { BlobCheckpointStore } from '@azure/eventhubs-checkpointstore-blob';

const connectionString = `${process.env.AZURE_EVENTHUB_CONNECTION_STRING}`;
const eventHubName = `${process.env.AZURE_EVENTHUB_NAME}`;
const consumerGroup = '$Default'; // name of the default consumer group
const storageConnectionString = `${process.env.AZURE_STORAGE_CONNECTION_STRING}`;
const containerName = `${process.env.AZURE_STORAGE_CONTAINER_NAME}`;

export default async function receiveEvent() {
  // Create a blob container client and a blob checkpoint store using the client.
  const containerClient = new ContainerClient(storageConnectionString, containerName);
  const checkpointStore = new BlobCheckpointStore(containerClient);

  // Create a consumer client for the event hub by specifying the checkpoint store.
  const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, checkpointStore);

  // Subscribe to the events, and specify handlers for processing the events and errors.
  const subscription = consumerClient.subscribe(
    {
      processEvents: async (events, context) => {
        if (events.length === 0) {
          console.log(`No events received within wait time. Waiting for next interval`);
          return;
        }

        for (const event of events) {
          console.log(
            `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
          );
        }
        // Update the checkpoint.
        await context.updateCheckpoint(events[events.length - 1]);
      },

      processError: async (err, context) => {
        console.log(`Error : ${err}`);
      },
    },
    { startPosition: earliestEventPosition }
  );

  // After 30 seconds, stop processing.
  await new Promise(resolve => {
    setTimeout(async () => {
      await subscription.close();
      await consumerClient.close();
      resolve(true);
    }, 30000);
  });
}
