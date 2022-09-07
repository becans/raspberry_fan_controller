FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY conf conf
COPY fan_controller.js .
CMD [ "node", "fan_controller.js" ]
