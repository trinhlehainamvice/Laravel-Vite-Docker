FROM php:8.2-fpm-alpine

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

WORKDIR /var/www/html


# MacOS staff group's
RUN delgroup dialout

# Assign user:group of UID:GID to laravel
RUN addgroup -g ${GID} --system laravel
RUN adduser -G laravel --system -D -s /bin/sh -u ${UID} laravel

# Set user:group that run php-fpm as laravel
RUN sed -i "s/user = www-data/user = laravel/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = laravel/g" /usr/local/etc/php-fpm.d/www.conf
RUN echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

RUN apk update && apk add \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

# Set file permissions
RUN chown -R laravel:laravel /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod 777 -R /var/www/html/storage /var/www/html/bootstrap/cache

RUN chown laravel:laravel /var/www/html/entrypoint.sh
RUN chmod +x /var/www/html/entrypoint.sh

USER laravel

RUN composer install
# TODO: need to filter environment variables when copy to docker image
RUN cp .env.example .env
RUN php artisan key:generate

# NOTE: need to set entrypoint.sh to #!/bin/sh in alpine image
# also ensure entrypoint.sh filesystem is set to LF
ENTRYPOINT [ "./entrypoint.sh" ]

# NOTE: this command causes ERROR "command php-fpm is not defined"
# ENTRYPOINT [ "php", "/var/www/html/artisan" ]

# CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
EXPOSE 9000
