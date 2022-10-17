#FROM nginx:alpine
#COPY ./build /usr/share/nginx/html
#CMD ["sh", "-c", "nginx -g 'daemon off;'"]


FROM nginxinc/nginx-unprivileged

#### copy nginx conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]