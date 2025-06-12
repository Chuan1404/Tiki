FROM node:18

WORKDIR /app

COPY src/shared/package*.json ./shared/

WORKDIR /app/shared
RUN npm install

COPY src/shared /app/shared

COPY src/services/brand-service/package*.json ./services/brand-service/
COPY src/services/brand-service/tsconfig*.json ./services/brand-service/

WORKDIR /app/services/brand-service
RUN npm install

COPY src/services/brand-service/src ./src

EXPOSE 3003
CMD ["npm", "run", "dev"]