FROM node:18

WORKDIR /app

COPY src/modules/auth-service/package*.json ./modules/auth-service/
COPY src/modules/auth-service/tsconfig*.json ./modules/auth-service/
COPY src/shared/package*.json ./shared/

WORKDIR /app/shared
RUN npm install

WORKDIR /app/modules/auth-service
RUN npm install

COPY src/shared ../../shared

COPY src/modules/auth-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

