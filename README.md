# Retorno — Teste Full Stack

Olá! Seguem as observações sobre o desenvolvimento do teste técnico:

## ✅ Tecnologias e Requisitos Atendidos

### Front-end (Angular 17)
- Utilizado Angular 17 com Angular Router e Reactive Forms.
- Estilização com Tailwind CSS.
- Implementado roteamento com lazy loading.
- Uso de operadores RxJS para debounce de buscas, e requisições HTTP.

### Funcionalidades
- Tela de login com feedbacks e validações conforme solicitado.
- Fluxo de autenticação implementado com persistência via token + refresh token.
- CRUD completo para a entidade **Clínica**: listagem com filtro, paginação, ordenação e ações (visualizar/editar).
- Formulário com reuso para criação e edição, validações síncronas e assíncronas.
- Validação de CNPJ implementada.
- Combobox de **Regional** e **Especialidades** carregados via requisições assíncronas.
- Modal de especialidades acionado quando necessário (5 ou mais).

### Back-end (Laravel 5.4)
- Implementado com Eloquent ORM.
- Tabelas criadas com engine **InnoDB**, com relacionamentos configurados conforme regras de negócio.
- API REST estruturada para login, CRUD de clínicas, especialidades e regionais.
- Controle de autenticação e autorização via middleware.
- Utilizado Docker com MySQL para ambiente local.

## 🔍 Pontos de Atenção
- Todos os requisitos obrigatórios foram atendidos.
- Os itens listados como “**seria ótimo se...**” foram priorizados sempre que possível.
- O projeto foi estruturado com foco em legibilidade, manutenibilidade e boas práticas.

## 📂 Como rodar o projeto
O ambiente é composto por três serviços Docker: `frontend`, `backend` e `db`.

### Passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/jbmaciel/teste-full-stack-jb
   cd teste-full-stack-jb

2. Crie um .env na raiz do repositório:

    Sugestão:
    ```bash
    # Variáveis de ambiente para o laravel. Copie o trecho abaixo para o .env do backend.
    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT=3306
    DB_DATABASE=amorsaude
    DB_USERNAME=amorsaude_user
    DB_PASSWORD=amorsaude_secret

    # Variáveis de ambiente para o servico db no docker.
    MYSQL_DATABASE=amorsaude
    MYSQL_USER=amorsaude_user
    MYSQL_PASSWORD=amorsaude_secret
    MYSQL_ROOT_PASSWORD=amorsaude_root

3. Suba os containers:
   ```bash
   docker-compose up -d

4. Acesse o container do backend e execute as migrations:
   ```bash
    docker exec -it backend bash
    php artisan migrate

    # As tabelas de Regionais e Especialidades serão populadas automaticamente.

5. Gere as chaves do Laravel Passport:
   ```bash
    php artisan passport:install
6. Copie o client_id e client_secret gerados e atualize o arquivo auth.service.ts no Angular com esses valores.


# Endereços
Backend: http://localhost:8000

Frontend: http://localhost