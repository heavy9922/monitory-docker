FROM node:21-alpine3.19

WORKDIR /usr/src/app

RUN npm install -g pnpm


COPY package.json ./
COPY pnpm-lock.yaml ./


RUN pnpm install

COPY . .


EXPOSE 3001

CMD [ "pnpm", "start:dev" ]