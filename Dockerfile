FROM node:boron

ENV KAFKA_URL=127.0.0.1:9092
ENV SERVER_PORT=8080
ENV WEBSOCKET_PORT=9999
ENV SERVE_STATIC=true

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

EXPOSE ${SERVER_PORT}
EXPOSE ${WEBSOCKET_PORT}

CMD [ "node", "./server/index.js" ]