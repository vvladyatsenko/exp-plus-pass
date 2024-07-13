# Express Passport Auth Server + MongoDB Atlas

## Опис

### Цей проект є прикладом сервера на Express.js з використанням Passport для авторизації користувачів та MongoDB Atlas для зберігання даних користувачів. У проекті реалізовані наступні функціональності:

- Реєстрація нових користувачів з хешуванням паролів за допомогою bcryptjs.
- Вхід користувачів у систему з перевіркою пароля.
- Вихід користувачів із системи з знищенням сесії.
- Доступ до захищених маршрутів лише для авторизованих користувачів.
- Зберігання даних користувачів у MongoDB Atlas для централізованого управління та зберігання даних.
- Редагування користувачів.

## Технології

- Node.js
- Express.js
- Passport.js
- Pug (для шаблонів)
- bcryptjs (для хешування паролів)
- express-session (для управління сесіями)
- MongoDB Atlas (для зберігання даних)

## Встановлення

- npm install або yarn install

- файл .env вже у кореневій директорії проекту


## Запуск

- npm start або yarn start

`Сервер буде доступний за адресою http://localhost:3000`

## Маршрути

### Маршрути авторизації

`GET /auth/register`<br>
Відображає сторінку реєстрації

`POST /auth/register`<br>
Реєстрація нового користувача. Очікує в тілі запиту поля email та password.

- Приклад запиту:

`curl -X POST http://localhost:3000/auth/register -d "email=user@example.com&password=yourpassword"`<br>

`GET /auth/login`<br>
Відображає сторінку входу<br>

`POST /auth/login`<br>
Авторизація користувача. Очікує в тілі запиту поля email та password.<br>

- Приклад запиту:

`curl -X POST http://localhost:3000/auth/login -d "email=user@example.com&password=yourpassword"`<br>

`GET /auth/logout`<br>
Вихід користувача із системи. Знищує сесію та перенаправляє на головну сторінку.<br>

- Приклад запиту:

`curl http://localhost:3000/auth/logout`<br>

### Захищені маршрути

`GET /protected`<br>
Відображає захищену сторінку, доступну лише авторизованим користувачам. Якщо користувач не авторизований, перенаправляє на сторінку входу.<br>

Приклад запиту:<br>

`curl -c cookies.txt http://localhost:3000/auth/login -d "email=user@example.com&password=yourpassword"`<br>
`curl -b cookies.txt http://localhost:3000/protected`<br>

### Дані користувачів

`GET /data`<br>
Відображає сторінку з даними всіх зареєстрованих користувачів.<br>

Приклад запиту:<br>

`curl http://localhost:3000/data`<br>

### Приклади використання

Реєстрація нового користувача:<br>
- Перейдіть за адресою `http://localhost:3000/auth/register`
- Введіть email та пароль для реєстрації нового користувача.

Вхід в систему:<br>
- Перейдіть за адресою `http://localhost:3000/auth/login`
- Введіть email та пароль для входу в систему.
- Ви можете використовувати наступні тестові облікові записи для входу в систему:

1. `user1@example.com` з паролем `password123`
2. `user2@example.com` з паролем `password123`
3. `user3@example.com` з паролем `password123`
4. `user4@example.com` з паролем `password123`
5. `user5@example.com` з паролем `password123`
6. `user6@example.com` з паролем `password123`
7. `user7@example.com` з паролем `password123`

Доступ до захищеного маршруту:<br>
- Після успішного входу перейдіть за адресою `http://localhost:3000/protected` для доступу до захищеної сторінки.

Перегляд даних користувачів:<br>
- Перейдіть за адресою `http://localhost:3000/data` для перегляду списку всіх зареєстрованих користувачів з їх email і датою створення.

Перегляд даних користувачів:<br>
- Перейдіть за адресою `http://localhost:3000/crud` сторінка для редагування користувача.