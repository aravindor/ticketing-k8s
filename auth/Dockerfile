FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
CMD [ "npm", "start" ]