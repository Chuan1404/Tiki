FROM node:18

WORKDIR /app

COPY src/services/product-service/package*.json ./services/product-service/
COPY src/services/product-service/tsconfig*.json ./services/product-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/services/product-service
RUN npm install

COPY src/services/product-service/src ./src

EXPOSE 3004
CMD ["npm", "run", "dev"]

