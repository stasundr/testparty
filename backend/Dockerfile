FROM node:latest

WORKDIR /backend
COPY . .

RUN yarn
RUN yarn build

CMD ["node", "./build/main.js"]