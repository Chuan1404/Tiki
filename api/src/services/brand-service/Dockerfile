FROM node:18

WORKDIR /app

COPY src/services/brand-service/package*.json ./services/brand-service/
COPY src/services/brand-service/tsconfig*.json ./services/brand-service/
COPY src/shared /app/shared

WORKDIR /app/shared
RUN npm install

WORKDIR /app/services/brand-service
RUN npm install

COPY src/services/brand-service/src ./src

EXPOSE 3003
CMD ["npm", "run", "dev"]

