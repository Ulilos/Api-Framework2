#Indica a imagem que já está sendo usada no projeto e o node também tem um FROM que também tem um FROM e assim por diante
FROM node:22 

#Cria a pasta do diretório e entra na pasta, é um mkdir + cd .
WORKDIR /app

#Tem dois copys para copiar apenas o que foi mudado depois por o primeiro copy ser mais pesado
COPY package.json ./

#Roda um comando para pré requisitos, para setup
RUN npm install

COPY . .

#Libera a porta do contâiner para entrar, mas não é necessariamente a porta que o programa vai rodar
EXPOSE 3000

#Comandos para disponibilizar o app pronto 
CMD ["node", "index.js"]

# Comandos no bash:
#     Criar imagem: docker build -t (tag) aula-docker:latest -f (file) Dockerfile . (o ponto é só se estiver no caminho certo)
#     Rodar a Api: docker run --name teste -p 3000:3000 aula-docker:latest ou
#                  docker run -d -p 3000:3000 aula-docker:latest
#    hub.docker para acessar docker hub
