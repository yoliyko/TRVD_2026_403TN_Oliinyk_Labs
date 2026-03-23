FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Відкриваємо порт Vite (5173)
EXPOSE 5173

# Запускаємо в режимі розробки, але з прапорцем --host, 
# щоб Docker міг "прокинути" цей порт назовні
CMD ["npm", "run", "dev", "--", "--host"]