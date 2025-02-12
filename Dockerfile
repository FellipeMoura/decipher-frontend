# Etapa 1: Construção
FROM node:18 AS build
WORKDIR /app
COPY package.json ./ 
RUN yarn install    
COPY . .             
RUN yarn build  

# Etapa 2: Servir os arquivos estáticos
FROM nginx:1.21-alpine
COPY --from=build /app/dist /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
