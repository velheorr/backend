const nodemailer = require('nodemailer');

// Создаем объект с настройками для отправки писем
const transporter = nodemailer.createTransport({
    host: 's3grdn.ru',
    port: 587,
    secure: false, // use SSL
    ignoreTLS: true,
    auth: {
        user: 'no_reply@s3grdn.ru',
        pass: 'I0CY8SSJ2HKqOXwz'
    }
});

module.exports = transporter