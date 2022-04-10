FROM node:14.19.1-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

ADD . /usr/src/app

CMD ["npm", "start"]
EXPOSE 3000