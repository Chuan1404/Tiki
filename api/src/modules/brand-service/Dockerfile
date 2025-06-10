FROM node:18

WORKDIR /app

COPY src/modules/brand-service/package*.json ./modules/brand-service/
COPY src/modules/brand-service/tsconfig*.json ./modules/brand-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/modules/brand-service
RUN npm install

COPY src/modules/brand-service/src ./src

EXPOSE 3001
CMD ["npm", "run", "dev"]

