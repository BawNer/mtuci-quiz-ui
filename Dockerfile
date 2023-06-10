FROM node:16.15-alpine as builder
ARG VUE_APP_API_URI=""
ENV VUE_APP_API_URI=${VUE_APP_API_URI}
COPY app /app
WORKDIR /app
RUN apk add git
RUN yarn
RUN yarn build

FROM nginx:stable-alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY  --from=builder /app/dist/spa /usr/share/nginx/html
