# Використовуємо образ Node.js
FROM node:lts

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів проекту
COPY . .

# Відкриваємо порт 3000
EXPOSE 3000

# Команда для запуску вашого додатка
CMD ["node", "src/app.js"]
