FROM node:18

WORKDIR /app

COPY src/modules/cart-service/package*.json ./modules/cart-service/
COPY src/modules/cart-service/tsconfig*.json ./modules/cart-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/modules/cart-service
RUN npm install

COPY src/modules/cart-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

