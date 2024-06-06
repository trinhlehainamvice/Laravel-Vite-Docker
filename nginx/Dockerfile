FROM nginx:stable-alpine

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

# MacOS staff group's gid is 20
RUN delgroup dialout

# NOTE: need to create a new group and user to be accessed by laravel user in laravel docker container
RUN addgroup -g ${GID} --system laravel
RUN adduser -G laravel --system -D -s /bin/sh -u ${UID} laravel
# NOTE: the following line is needed to allow laravel user from php container to access the nginx container
RUN sed -i "s/user  nginx/user laravel/g" /etc/nginx/nginx.conf

ADD ./default.conf /etc/nginx/conf.d/

RUN mkdir -p /var/www/html
