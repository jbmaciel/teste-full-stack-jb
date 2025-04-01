FROM php:7.0-fpm-alpine

# Instalando dependências
RUN apk update && apk add --no-cache \
    zip unzip nodejs npm curl git libpng-dev libxml2-dev oniguruma-dev libmcrypt-dev

# Instalando extensões PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring mcrypt gd
    
# Limpeza de cache
RUN rm -rf /var/lib/apt/lists/*

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --2.2
# Copia apenas os arquivos do Composer para otimizar cache

# Mover o Composer para o diretório correto
RUN mv composer.phar /usr/local/bin/composer

WORKDIR /var/www

COPY . .

RUN chmod -R 775 storage bootstrap/cache

RUN composer install --no-interaction --optimize-autoloader

# Instalar as dependências do Node.js (compilar os assets)
RUN npm install

# Compilar os assets
RUN npm run dev

CMD ["php-fpm"]
