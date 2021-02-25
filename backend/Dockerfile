FROM node:latest AS builder

WORKDIR /backend
COPY ./package.json ./

RUN npm install
COPY . .

RUN npm run build

# Second Stage
FROM node:14.2.0-alpine
WORKDIR /backend

COPY --from=builder /backend ./
EXPOSE 3000

CMD ["npm", "run", "start:prod"]