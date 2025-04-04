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

# Instalando dependências do PHP antes de copiar todo o código
# RUN composer install

# Copiando arquivos do projeto
COPY . .

# Permissões para diretórios do Laravel
RUN chmod -R 775 storage bootstrap/cache

# Instalando dependências do Node.js (compilar assets)
# RUN npm install && npm run production

CMD ["php-fpm"]
