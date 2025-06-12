FROM node:18

WORKDIR /app

COPY src/modules/mail-service/package*.json ./modules/mail-service/
COPY src/modules/mail-service/tsconfig*.json ./modules/mail-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/modules/mail-service
RUN npm install

COPY src/modules/mail-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

