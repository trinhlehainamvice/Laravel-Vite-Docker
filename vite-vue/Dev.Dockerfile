FROM node:20-alpine

WORKDIR /var/www/html/web

# TODO: mount local machine project folder to web container to enable hot reload
# RUN npm install

# Vite Default Dev Server Port
EXPOSE 5173
# CMD ["npm", "run", "dev"]
