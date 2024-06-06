FROM node:20-slim

WORKDIR /var/www/html/web

COPY package.json .

RUN npm install

COPY . .

# Vite Default Dev Server Port
EXPOSE 5173
CMD ["npm", "run", "dev"]
