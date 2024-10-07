const transporter = require('./mailConfig');

function sendAdminRegConfirm(login, name){
    const telo = `
        Здравствуйте!</br>
        В приложении зарегистрировался новый пользователь:</br>
        ФИО: ${name}</br>
        Почта: ${login}</br>
        </br>
        Пожалуйста, активируйте доступ пользователю к приложению и уведомьте пользователя</br>
        </br>
        </br>
        <i>Письмо отправлено сервером, не отвечайте на него!</i>
    `
    // Настройки письма
    let mailOptions = {
        from: 'no_reply@s3grdn.ru',
        to: 'it@grdn.ru',
        subject: 'Подтверждение регистрации в приложении Guardian',
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

module.exports = sendAdminRegConfirm