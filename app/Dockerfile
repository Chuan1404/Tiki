FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY jsconfig.json ./jsconfig.json
COPY public ./public
COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]




