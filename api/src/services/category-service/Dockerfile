FROM node:18

WORKDIR /app

COPY src/services/category-service/package*.json ./services/category-service/
COPY src/services/category-service/tsconfig*.json ./services/category-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/services/category-service
RUN npm install

COPY src/services/category-service/src ./src

EXPOSE 3002
CMD ["npm", "run", "dev"]

