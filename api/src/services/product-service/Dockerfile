FROM node:18

WORKDIR /app

COPY src/services/product-service/package*.json ./services/product-service/
COPY src/services/product-service/tsconfig*.json ./services/product-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm config set registry https://registry.npmmirror.com && npm install

WORKDIR /app/services/product-service
RUN npm config set registry https://registry.npmmirror.com && npm install

COPY src/services/product-service/src ./src

EXPOSE 3004
CMD ["npm", "run", "dev"]

