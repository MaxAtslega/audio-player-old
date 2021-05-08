FROM node:12

WORKDIR /backend

COPY ./package* ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3005
CMD ["npm", "run", "start:prod"]