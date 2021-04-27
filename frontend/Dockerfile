FROM node:14

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .

ARG API_URL
ENV API_URL $API_URL

EXPOSE 3000

RUN npm run build
CMD npm run start
