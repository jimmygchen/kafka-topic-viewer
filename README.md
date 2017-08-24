# kafka-topic-viewer

A simple web-based viewer to monitor messages on topic(s) in Kafka.

Connects to Kafka via a WebSockets based proxy (using [kafka-proxy-ws](https://github.com/Microsoft/kafka-proxy-ws)).

![Screenshots](https://github.com/jchen86/kafka-topic-viewer/blob/master/screenshots.gif?raw=true)

## Features
- Monitor multiple Kafka topics
- Receive Kafka messages in real-time

## Quick Start

1. Ensure [docker](https://www.docker.com) is installed and running.

2. Run the following commands:
```bash
$ docker pull jchen86/kafka-topic-viewer
$ docker run --rm -it -p 8080:8080 -p 9999:9999 \
             -e KAFKA_URL=http://your-kafka-url:port \
             -e SERVE_STATIC=true \
             jchen86/kafka-topic-viewer
```

## Building the Docker image

1. Run npm build on client directory
```bash
$ cd client
$ npm run build
```

2. Run docker build on project root directory
```bash
$ cd ..
$ docker build -t jchen86/kafka-topic-viewer .
```

## Running from source

1. Configure the Kafka URL in `server/config.js`. Default is localhost:9092.

2. Start the Proxy server
```bash
$ npm install && npm run start
```

3. Configure the topic names to monitor in `client/src/app/config.js`

4. Start the client app
```bash
$ cd client
$ npm install && npm run serve
```
Kafka Topic Viewer should now be live on your server at port 3000.

## License

The project is licensed under the MIT license.
