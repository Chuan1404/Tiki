FROM node:18

WORKDIR /app

COPY src/servives/cart-service/package*.json ./servives/cart-service/
COPY src/servives/cart-service/tsconfig*.json ./servives/cart-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/servives/cart-service
RUN npm install

COPY src/servives/cart-service/src ./src

EXPOSE 3005
CMD ["npm", "run", "dev"]

