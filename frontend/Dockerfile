# Usar uma versão estável do Node.js LTS
FROM --platform=$BUILDPLATFORM node:20-bullseye-slim as builder

# Criar diretório de trabalho
RUN mkdir /project
WORKDIR /project

# Instalar Angular CLI na versão correta
RUN npm install -g @angular/cli@17

# Copiar arquivos de dependência e instalar pacotes
COPY package.json package-lock.json ./
RUN npm i --force

# Copiar restante dos arquivos
COPY . .

# Expor a porta do Angular
EXPOSE 4200

# Comando para iniciar o servidor
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4200", "--disable-host-check"]

