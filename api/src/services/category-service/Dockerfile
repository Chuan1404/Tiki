FROM node:18

WORKDIR /app

COPY src/services/category-service/package*.json ./services/category-service/
COPY src/services/category-service/tsconfig*.json ./services/category-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm config set registry https://registry.npmmirror.com && npm install

WORKDIR /app/services/category-service
RUN npm config set registry https://registry.npmmirror.com && npm install

COPY src/services/category-service/src ./src

EXPOSE 3002
CMD ["npm", "run", "dev"]

