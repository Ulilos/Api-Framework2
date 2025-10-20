FROM node:22

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

# Comandos no bash:
#     Criar imagem: docker build -t aula-docker:latest -f Dockerfile .
#     Rodar a Api: docker run --name teste -p 3000:3000 aula-docker:latest ou
#                  docker run -d -p 3000:3000 aula-docker:latest
