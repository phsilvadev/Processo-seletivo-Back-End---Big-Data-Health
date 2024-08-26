# Use uma imagem Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Instala o Nest CLI globalmente
RUN npm install -g @nestjs/cli

# Copia os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --production

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o código (caso você use TypeScript)
RUN npm run build

# Expõe a porta que o NestJS irá utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
