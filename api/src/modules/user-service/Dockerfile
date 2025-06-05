FROM node:18

WORKDIR /app

COPY src/modules/user-service/package*.json ./modules/user-service/
COPY src/modules/user-service/tsconfig*.json ./modules/user-service/
COPY src/shared/package*.json ./shared/

WORKDIR /app/shared
RUN npm install

WORKDIR /app/modules/user-service
RUN npm install

COPY src/shared ../../shared

COPY src/modules/user-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

