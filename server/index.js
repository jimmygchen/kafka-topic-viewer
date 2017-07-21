'use strict';
const KafkaProxy = require('kafka-proxy');
const patchKafkaProxy = require('./kafkaProxyPatch');

let kafkaProxy = new KafkaProxy({
    wsPort: 9999,
    kafka: 'localhost:9092/',
});

patchKafkaProxy(kafkaProxy);

kafkaProxy.listen();