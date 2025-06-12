FROM node:18

WORKDIR /app

COPY src/services/cart-service/package*.json ./services/cart-service/
COPY src/services/cart-service/tsconfig*.json ./services/cart-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/services/cart-service
RUN npm install

COPY src/services/cart-service/src ./src

EXPOSE 3005
CMD ["npm", "run", "dev"]

