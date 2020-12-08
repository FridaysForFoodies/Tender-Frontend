FROM node:erbium-alpine as build
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
ENTRYPOINT ["npm", "run", "serve"]

FROM nginx:alpine
COPY --from=build /app/dist/ /var/www/html/
COPY ./nginx/dev.conf /etc/nginx/sites-enabled/
COPY ./nginx/nginx.conf /etc/nginx/
