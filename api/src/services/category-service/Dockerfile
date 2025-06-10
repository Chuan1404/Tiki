FROM node:18

WORKDIR /app

COPY src/modules/category-service/package*.json ./modules/category-service/
COPY src/modules/category-service/tsconfig*.json ./modules/category-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/modules/category-service
RUN npm install

COPY src/modules/category-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

