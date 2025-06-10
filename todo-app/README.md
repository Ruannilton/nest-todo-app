# Todo App

Uma aplicação de gerenciamento de tarefas (TODO) desenvolvida com NestJS, TypeScript e PostgreSQL, seguindo princípios de Clean Architecture e Domain-Driven Design (DDD).

## 📋 Sobre o Projeto

Esta aplicação oferece um sistema completo para gerenciamento de tarefas pessoais, incluindo:

- **Autenticação de usuários** com JWT
- **CRUD completo de tarefas** (criar, listar, atualizar, deletar)
- **Gerenciamento de usuários**
- **Arquitetura limpa** com separação clara de responsabilidades
- **Documentação automática** com Swagger
- **Testes unitários e de integração**

### 🏗️ Arquitetura

O projeto segue os padrões de Clean Architecture organizados em camadas:

- **Domain**: Entidades, Value Objects e DTOs
- **Application**: Use Cases e Contratos
- **Infrastructure**: Repositórios e configurações de banco
- **Presentation**: Controllers e DTOs de API

### 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **PostgreSQL** - Banco de dados
- **TypeORM** - ORM para TypeScript
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **Swagger** - Documentação da API
- **Jest** - Testes

## 🚀 Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- **Visual Studio Code**
- **Docker** e **Docker Compose**
- **Extensão Dev Containers** do VS Code

### Configuração do Dev Container

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd nest-test/todo-app
   ```

2. **Abra no VS Code:**
   ```bash
   code .
   ```

3. **Configure o Dev Container:**
   - Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
   - Digite: `Dev Containers: Reopen in Container`
   - Selecione a opção e aguarde a criação do container

   O VS Code irá automaticamente:
   - Construir o container com Node.js 22 e PostgreSQL
   - Instalar as dependências do projeto
   - Configurar o ambiente de desenvolvimento

4. **Verificar a configuração:**
   - O container inclui Node.js, npm, e @nestjs/cli pré-instalados
   - PostgreSQL rodando na porta 5432
   - Aplicação configurada para rodar na porta 3000

### Variáveis de Ambiente

O projeto utiliza as seguintes configurações padrão no dev container:

- **Database Host**: `localhost`
- **Database Port**: `5432`
- **Database Name**: `postgres`
- **Database User**: `postgres`
- **Database Password**: `postgres`

## 🏃‍♂️ Executando a Aplicação

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Configuração do Banco de Dados

Execute as migrações para criar as tabelas:

```bash
npm run typeorm:run-migrations
```

### 3. Executar a Aplicação

#### Modo de Desenvolvimento (com hot reload):
```bash
npm run start:dev
```

#### Modo de Produção:
```bash
npm run build
npm run start:prod
```

#### Modo Debug:
```bash
npm run start:debug
```

### 4. Acessar a Aplicação

- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api
- **Banco PostgreSQL**: localhost:5432

## 📚 Scripts Disponíveis

### Desenvolvimento
- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia com hot reload
- `npm run start:debug` - Inicia em modo debug

### Build e Produção
- `npm run build` - Compila o projeto
- `npm run start:prod` - Executa a versão compilada

### Testes
- `npm run test` - Executa testes unitários
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:cov` - Executa testes com coverage
- `npm run test:e2e` - Executa testes end-to-end

### Banco de Dados
- `npm run typeorm:run-migrations` - Executa migrações
- `npm run typeorm:revert-migration` - Reverte última migração
- `npm run typeorm:generate-migration` - Gera nova migração
- `npm run typeorm:create-migration` - Cria migração vazia

### Code Quality
- `npm run lint` - Executa ESLint
- `npm run format` - Formata código com Prettier

## 🔐 Autenticação

A API utiliza autenticação JWT. Para acessar endpoints protegidos:

1. Registre um usuário em `/auth/signup`
2. Faça login em `/auth/signin`
3. Use o token retornado no header: `Authorization: Bearer <token>`

## 📖 Documentação da API

Acesse http://localhost:3000/api para ver a documentação completa da API gerada automaticamente pelo Swagger.

## 🧪 Testes

O projeto inclui testes unitários e de integração. Para executar todos os testes:

```bash
npm run test
```

Para testes com coverage:

```bash
npm run test:cov
```

