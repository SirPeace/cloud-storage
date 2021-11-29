FROM php:8.0-fpm-alpine

# Install:
# 1) MongoDB driver
# 2) Missing php extensions 
# 3) Symfony CLI
RUN apk add gcc libc-dev autoconf bash make openssl-dev && \
    pecl install mongodb && \
    docker-php-ext-enable mongodb.so && \
    docker-php-ext-install tokenizer sockets && \
    wget https://get.symfony.com/cli/installer -O - | bash && \
    mv /root/.symfony/bin/symfony /usr/local/bin/symfony

# Copy composer from official docker image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json .
RUN composer install

COPY . .

EXPOSE 8000
CMD symfony server:start --port=8000 --no-tls