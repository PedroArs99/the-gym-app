FROM node:18-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY ./ ./ 

RUN npm run build

FROM node:18-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/build ./build

RUN ls -al .

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "-r",  "dotenv/config", "build"]
