# Etapa 1: Construcción de frontend con Vite
FROM node:18 AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Backend con PHP 8.3 (más cercano a 8.4, ya que 8.4 aún no está en imágenes oficiales estables)
FROM php:8.3-fpm

# Instala extensiones necesarias para PostgreSQL y utilidades comunes
RUN apt-get update && apt-get install -y \
    libpq-dev unzip git zip curl \
    && docker-php-ext-install pdo_pgsql

# Copia Composer desde imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copia el backend (Laravel)
COPY . .

# Instala dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Copia los assets generados por Vite
COPY --from=frontend-builder /app/public/build ./public/build

# Permisos para Laravel
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Cache de configuración Laravel
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Puerto para el servidor
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
