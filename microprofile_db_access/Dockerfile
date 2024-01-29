FROM mysql:8.0.25

ENV MYSQL_DATABASE=swtp
ENV MYSQL_ALLOW_EMPTY_PASSWORD=true

COPY ./db/conf/* /etc/mysql/conf.d
COPY ./db/initdb/* /docker-entrypoint-initdb.d/  