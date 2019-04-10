# STAGE BUILD
FROM node:latest as builder

WORKDIR /frontend
COPY . .

RUN yarn
RUN yarn build


# STAGE SERVE
FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY --from=builder /frontend/build .