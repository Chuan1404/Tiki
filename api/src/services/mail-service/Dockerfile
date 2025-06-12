FROM node:18

WORKDIR /app

COPY src/services/mail-service/package*.json ./services/mail-service/
COPY src/services/mail-service/tsconfig*.json ./services/mail-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/services/mail-service
RUN npm install

COPY src/services/mail-service/src ./src

EXPOSE 3006
CMD ["npm", "run", "dev"]

