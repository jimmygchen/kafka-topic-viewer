export default {
  getKafkaProxyURL,
  consumerGroupPrefix: 'kafka-topic-viewer-client-',
  topics: ['Sport-News', 'Finance-News', 'International-News', 'Technology-News', 'Other-News'],
  defaultNumOfTopics: 3,
  messageLimit: 10
};

function getKafkaProxyURL() {
    let kafkaProxyWS = `ws://${getHostName()}:${window.ktvClientConfig.wsPort}`;
    console.log(`Connecting to WebSocket proxy ${kafkaProxyWS}`);
    return kafkaProxyWS;
}

function getHostName() {
    return window.location.origin.match(/^(\w+):\/\/([^/:]+)(?::\d+)?/)[2];
}