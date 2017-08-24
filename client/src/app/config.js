let kafkaProxyWS = `ws://${getHostName()}:9999`;

// FIXME: fetch config from server

export default {
  kafkaProxyWS,
  consumerGroupPrefix: 'kafka-topic-viewer-client-',
  topics: ['Sport-News', 'Finance-News', 'International-News', 'Technology-News', 'Other-News'],
  defaultNumOfTopics: 3,
  messageLimit: 10
};

function getHostName() {
    return window.location.origin.match(/^(\w+):\/\/([^/:]+)(?::\d+)?/)[2];
}