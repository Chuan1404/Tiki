FROM node:18

WORKDIR /app

COPY src/modules/auth-service/package*.json ./modules/auth-service/

COPY src/shared ./shared

WORKDIR /app/modules/auth-service

RUN npm install

COPY src/modules/auth-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

