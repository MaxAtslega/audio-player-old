FROM node:14

RUN mkdir /frontend
WORKDIR /frontend
COPY frontend/package.json .
RUN npm install
COPY . .

EXPOSE 3000

RUN npm run build
CMD npm run start
