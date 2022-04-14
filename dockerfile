FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY build /usr/share/nginx/html

EXPOSE 3000