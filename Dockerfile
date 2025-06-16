FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    zip \
    && docker-php-ext-install pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install \
    && npm run build

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]