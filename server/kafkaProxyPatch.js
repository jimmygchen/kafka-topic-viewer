module.exports = (kafkaProxy) => {
  Object.getPrototypeOf(kafkaProxy)._batchMessageHandler = function(messageSet, topicCombo, partition) {
    // workaround... nokafka onyl allows three params to be sent to message handlers, so we just concat and then unpack
    let consumerGroup = topicCombo.split('/')[0];
    let topic = topicCombo.split('/')[1];
    let batchSize = messageSet.length - 1;
    this.clients[consumerGroup][topic].received = this.clients[consumerGroup][topic].received + messageSet.length;
    this.clients[consumerGroup][topic].backlog = this.clients[consumerGroup][topic].received - this.clients[consumerGroup][topic].sent;
    //debug(`[${consumerGroup} / ${topic}] received offset: ${messageSet[batchSize].offset}`);

    if (this.clients[consumerGroup][topic]) {
      this.clients[consumerGroup][topic].ws.send(JSON.stringify(
        messageSet.map((message) => {
          return {
            // PATCH: send array buffer without converting with toString - deserialization is done on the client
            message: message.message.value,
            offset: message.offset
          }
        })
      ), (err) => this._handleSendResponse(err, this.clients[consumerGroup][topic], consumerGroup, topic, partition, messageSet[batchSize].offset, messageSet.length));
    }
  };
}