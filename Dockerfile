# Stage 1: Build Stage
FROM node:16 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:16-alpine AS launch

WORKDIR /app
COPY --from=builder /app .


ENV NODE_ENV=production
RUN npm prune --production # Remove Dependencies
EXPOSE ${SERV_PORT}

CMD ["npm", "run", "start:prod"]



