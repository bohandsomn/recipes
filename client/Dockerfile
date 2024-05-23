FROM node:18-alpine AS builder

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as runner

WORKDIR /client

COPY --from=builder /client .

EXPOSE 3000

CMD ["npm", "start"]
