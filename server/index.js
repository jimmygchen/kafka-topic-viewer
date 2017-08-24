'use strict';

const KafkaProxy = require('kafka-proxy');
const express = require('express');
const path = require('path');

const config = require('./config');
const patchKafkaProxy = require('./kafkaProxyPatch');

const port = process.env.SERVER_PORT || config.serverPort;
const wsPort = process.env.WEBSOCKET_PORT || config.webSocketPort;
const kafkaUrl = process.env.KAFKA_URL || config.kafkaUrl;

startKafkaWebSocketProxy();
startExpressServer();

function startKafkaWebSocketProxy() {
    console.log(`Connecting to Kafka server ${kafkaUrl}`);
    console.log(`Starting Kafka WebSocket Proxy on port ${wsPort}`);

    let kafkaProxy = new KafkaProxy({
        wsPort: wsPort,
        kafka: kafkaUrl,
    });

    patchKafkaProxy(kafkaProxy);

    kafkaProxy.listen();
}

function startExpressServer() {
    let app = express();

    let topics = process.env.KAFKA_TOPICS;
    topics = topics && topics.split(',');

    app.get('/clientConfig.json', function (req, res) {
        res.json({wsPort, topics});
    });

    if (process.env.SERVE_STATIC === 'true') {
        app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
    }

    app.listen(port, () => {
        console.info(`Express server is running at http://localhost:${port}`);
    })
}