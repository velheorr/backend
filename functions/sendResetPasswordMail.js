const transporter = require('./mailConfig');

function sendResetPasswordMail(user, link){
    const telo = `
        Добрый день, ${user.name}</br>
        </br>
        Вами отправлен запрос на изменение пароля в <b>приложении Guardian</b></br>
        Для смены пароля перейдите по следующей ссылке:</br>
        </br>
        ${link}</br>
        </br>
        </br>
        <i>Письмо отправлено сервером, не отвечайте на него!</i>
    `
    // Настройки письма
    let mailOptions = {
        from: 'no_reply@s3grdn.ru',
        to: user.login,
        subject: 'Сброс пароля приложения Guardian',
        html: telo
    };
    // Отправляем письмо
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email успешно отправлен: ' + info.response);
        }
    });
}

module.exports = sendResetPasswordMail