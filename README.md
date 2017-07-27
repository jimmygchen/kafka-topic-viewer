# kafka-topic-viewer

A simple web-based viewer to monitor messages on topic(s) in Kafka.

Connects to Kafka via a WebSockets based proxy (using [kafka-proxy-ws](https://github.com/Microsoft/kafka-proxy-ws)).

![Screenshots](https://github.com/jchen86/kafka-topic-viewer/blob/master/screenshots.gif?raw=true)

## Getting Started
1. Configure the topic names to monitor in `src/app/config.js`
```javascript
export default {
  kafkaProxyWS: 'ws://127.0.0.1:9999',
  consumerGroup: 'topic-monitor-ui-3',
  topics: ['Sport-News', 'Finance-News'],
  messageLimit: 30
};
```
2. Configure the kafka server in `server/index.js`
```javascript
let kafkaProxy = new KafkaProxy({
    wsPort: 9999,
    kafka: 'localhost:9092/',
});
```
3. Start the app
```bash
$ npm install
$ npm run serve
```