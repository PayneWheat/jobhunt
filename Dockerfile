FROM php:8-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql
RUN apk add --update npm mysql-client
RUN curl -sS https://getcomposer.org/installer​ | php -- \
     --install-dir=/usr/local/bin --filename=composer

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .
RUN composer update
RUN composer install
