FROM node:18

WORKDIR /app

COPY src/services/user-service/package*.json ./services/user-service/
COPY src/services/user-service/tsconfig*.json ./services/user-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm config set registry https://registry.npmmirror.com && npm install

WORKDIR /app/services/user-service
RUN npm config set registry https://registry.npmmirror.com && npm install

COPY src/services/user-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

