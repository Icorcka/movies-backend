# Use an official Node runtime as a parent image
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production && npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "server.js"]
