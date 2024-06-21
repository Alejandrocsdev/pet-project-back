FROM node:20

WORKDIR /app

COPY package.json .

ARG NODE_ENV

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]