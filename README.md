# API Configuração e Guia

## Indice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
  - [1. Instalação do Node.js](#1-clone-o-repositório)
  - [2. Clone o Repositório](#1-clone-o-repositório)
  - [3. Configuração do Cloudinary](#2-configuração-do-cloudinary)
  - [4. Configuração com Docker](#3-configuração-com-docker)
  - [5. Acessando a Documentação da API (Swagger)](#5-acessando-a-documentação-da-api-swagger)
  - [6. Parar e Reiniciar os Containers](#6-parar-e-reiniciar-os-containers)
- [Considerações Finais](#considerações-finais)

## Visão Geral

Esta API é um serviço desenvolvido com NestJS que integra o armazenamento de imagens com Cloudinary e utiliza PostgreSQL para armazenar metadados das imagens. Este guia irá orientá-lo sobre como configurar o ambiente e iniciar a aplicação.

## Requisitos

- Node.js
- Docker
- Conta no Cloudinary

## Configuração do Ambiente

### 1. Instalação do Node.js

Para instalar o Node.js, siga as instruções para o seu sistema operacional:

### Windows e macOS

1. Acesse o site oficial do Node.js e baixe o instalador apropriado para seu sistema operacional.

2. Execute o instalador e siga as instruções para concluir a instalação.

### Linux

Para sistemas baseados em Debian/Ubuntu:

```bash
sudo apt update
sudo apt install nodejs npm
```

Para sistemas baseados em Red Hat/CentOS:

```bash
sudo dnf install nodejs
```

Para garantir que o Node.js e o npm foram instalados corretamente, você pode verificar suas versões:

```bash
node -v
npm -v
```

### 2. Clone o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/phsilvadev/Processo-seletivo-Back-End---Big-Data-Health.git
cd seu-repositorio
```

### 3. Configuração do Cloudinary

1. Obtenha suas credenciais do Cloudinary:

   - Crie uma conta no [Cloudinary](https://cloudinary.com/users/register_free) e obtenha suas credenciais.

2. Crie o arquivo .env:

   Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

   ```bash
   SECRET=

   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=seu_usuario
   DATABASE_PASSWORD=sua_senha
   DATABASE_NAME=nome_do_banco_de_dados

   CLOUDINARY_CLOUD_NAME=seu_cloud_name
   CLOUDINARY_API_KEY=seu_api_key
   CLOUDINARY_API_SECRET=seu_api_secret

   PORT=3000

   ```

   Não esquecer de colocar seu SECRET

   - Execute esse comando no seu terminal para gerar secret

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 4. Configuração com Docker

A aplicação utiliza Docker e Docker Compose para rodar os serviços, incluindo o Node.js e o PostgreSQL.

1.  Inicie o Docker Compose:

    Execute o comando para construir e iniciar os containers:

        docker-compose up --build

2.  Verifique os containers em execução:

    Depois que os containers estiverem em execução, a aplicação estará disponível em http://localhost:3000.

### 5. Acessando a Documentação da API (Swagger)

A documentação da API gerada pelo Swagger estará disponível em:

    http://localhost:3000/api-docs

A partir dessa interface, você pode explorar todos os endpoints disponíveis, testar requisições e ver exemplos de payloads.

### 6. Parar e Reiniciar os Containers

- Para parar os containers, use:

      docker-compose down

- Para reiniciar os containers, use:

      docker-compose up

### Considerações Finais

- Certifique-se de que todas as variáveis de ambiente estão corretamente configuradas no arquivo .env.

- Utilize o Docker Compose para gerenciar o ambiente de desenvolvimento, incluindo o banco de dados e a aplicação.

- Utilize o Swagger para testar e explorar os endpoints da API.
