# Express Passport Auth Server

## Опис

Це приклад сервера на Express.js з використанням Passport для авторизації користувачів. У проекті реалізовані функції реєстрації, входу та виходу з системи, а також доступ до захищених маршрутів.

## Технології

- Node.js
- Express.js
- Passport.js
- Pug (для шаблонів)
- bcryptjs (для хешування паролів)
- express-session (для управління сесіями)

## Встановлення

- npm install або yarn install


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

### Налаштування

- Сесії налаштовані з використанням express-session. Налаштування включають секретний ключ для шифрування сесій та параметри cookie:<br>
----------------------------------------------------------------------------------------
```javascript
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true } // Встановіть secure: true для https
}));```markdown
----------------------------------------------------------------------------------------

### Passport
- Конфігурація Passport знаходиться у файлі config/passport.js. Використовується локальна стратегія авторизації з використанням email та пароля. Паролі зберігаються у зашифрованому вигляді з використанням bcryptjs.<br>
----------------------------------------------------------------------------------------

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const user = users.find(u => u.email === email);
    if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});
----------------------------------------------------------------------------------------

### Приклади використання
Реєстрація нового користувача:<br>
- Перейдіть за адресою http://localhost:3000/auth/register.
- Введіть email та пароль для реєстрації нового користувача.

Вхід в систему:<br>
- Перейдіть за адресою http://localhost:3000/auth/login.
- Введіть email та пароль для входу в систему.

Доступ до захищеного маршруту:<br>
- Після успішного входу перейдіть за адресою http://localhost:3000/protected для доступу до захищеної сторінки.