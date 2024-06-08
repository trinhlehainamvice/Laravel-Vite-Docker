############################################
# Base Image
############################################

# Learn more about the Server Side Up PHP Docker Images at:
# https://serversideup.net/open-source/docker-php/
# https://serversideup.net/open-source/docker-php/docs/guide/using-s6-overlay
FROM serversideup/php:8.2-fpm-nginx-alpine as base

# Switch to root before installing our PHP extensions
USER root
RUN install-php-extensions pdo pdo_mysql

############################################
# Development Image
############################################
FROM base as development

# We can pass USER_ID and GROUP_ID as build arguments
# to ensure the www-data user has the same UID and GID
# as the user running Docker.
ARG UID
ARG GID

# Switch to root so we can set the user ID and group ID
USER root
RUN docker-php-serversideup-set-id www-data $UID:$GID  && \
    docker-php-serversideup-set-file-permissions --owner $UID:$GID --service nginx

COPY --chown=www-data:www-data . /var/www/html

# Switch back to the unprivileged www-data user
USER www-data

# COPY ./nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf ./nginx
RUN composer install
# TODO: need to filter environment variables when copy to docker image
RUN cp .env.example .env
RUN rm .env.example
RUN php artisan key:generate

RUN chmod +x /var/www/html/entrypoint.sh

WORKDIR /var/www/html
# NOTE: need to use CMD instead of ENTRYPOINT to stack CMD in FROM image
CMD [ "./entrypoint.sh" ]
