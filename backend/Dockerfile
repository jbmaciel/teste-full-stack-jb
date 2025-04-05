FROM php:7.0-fpm-alpine

# Instalando dependências do sistema
RUN apk update && apk add --no-cache \
    zip unzip curl git libpng-dev libxml2-dev oniguruma-dev bash \
    nodejs

# Instalando extensões PHP necessárias
RUN docker-php-ext-install pdo pdo_mysql mbstring gd

# Instalando Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/local/bin/composer

# Definindo diretório de trabalho
WORKDIR /var/www

# Copia apenas arquivos essenciais para cache eficiente
COPY composer.json composer.lock ./

# Copiando arquivos do projeto
COPY . .

CMD ["php-fpm"]
