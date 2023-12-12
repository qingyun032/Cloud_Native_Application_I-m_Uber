FROM mysql:8.0.35

MAINTAINER WEi-CHENG
EXPOSE 3306

RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

ENV MYSQL_CHARSET utf8mb4
ENV MYSQL_COLLATION utf8mb4_unicode_ci

COPY ./init.sql /docker-entrypoint-initdb.d/
