FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

EXPOSE 9999
EXPOSE 3000

CMD [ "npm", "run", "serve:dist" ]


