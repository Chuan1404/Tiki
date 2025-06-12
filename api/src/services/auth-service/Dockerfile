FROM node:18

WORKDIR /app

COPY src/services/auth-service/package*.json ./services/auth-service/
COPY src/services/auth-service/tsconfig*.json ./services/auth-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/services/auth-service
RUN npm install

COPY src/shared /app/shared

COPY src/services/auth-service/src ./src

EXPOSE 3000
CMD ["npm", "run", "dev"]

