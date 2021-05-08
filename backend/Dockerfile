FROM node:12

RUN mkdir /backend
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3005

RUN npm run build
CMD ["npm", "run", "start:prod"]
