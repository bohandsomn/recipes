FROM node:18-alpine AS builder

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /server

COPY --from=builder /server ./

EXPOSE 4000

CMD ["node", "dist/main.js"]
