/*
 * This component returns a block of functions that user can use to send messages to specific topic.
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */
export function TopicFunction({ operations }) {
  const topicsDetails = getTopics(operations);
  let functions = '';

  topicsDetails.forEach((t) => {
    functions += `def send${t.name}(self, id):
        topic = "${t.topic}"
        self.client.publish(topic, id)\n`
  });

  return functions;
}

/*
 * This function returns a list of objects, one for each channel with two properties, name and topic
 * name - holds information about the operationId provided in the AsyncAPI document
 * topic - holds information about the address of the topic
 *
 * As input it requires a list of Channel models from the parsed AsyncAPI document
 */
function getTopics(operations) {
  const topicsDetails = [];

  operations.forEach(op => {
    const channels = op.channels().all();
    if (!channels.length) return;

    const channel = channels[0];
    const operationId = op.operationId() || op.id();

    topicsDetails.push({
      name: operationId.charAt(0).toUpperCase() + operationId.slice(1),
      topic: channel.address()
    });
  });

  return topicsDetails;
}