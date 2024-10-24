const transporter = require('./mailConfig');
// общая ф-я отправки
function sendNewMail(to, subj, telo) {
    // Настройки письма
    let mailOptions = {
        from: 'no_reply@s3grdn.ru',
        to: to,
        subject: 'Регистрация в приложении Guardian',
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
// юзер зарегистрировался
function sendUserReg(login, name){
    const telo = `
        Здравствуйте, ${name}</br>
        Спасибо за регистрацию в нашем приложении!  В данный момент ваша учетная запись находится в процессе подтверждения.</br>
        </br>
        Ожидайте, пожалуйста, уведомление о подтверждении вашей регистрации. Если у вас возникли вопросы или вам требуется помощь, 
        не стесняйтесь связаться с нашей службой поддержки <a href="mailto:it@grdn.ru&body=Веб приложение">it@grdn.ru</a>
        </br>
        Спасибо за ваше терпение!
        </br>
        </br>
        <i>Письмо отправлено сервером, не отвечайте на него!</i>
    `

    sendNewMail(login, 'Регистрация в приложении Guardian', telo)
}
// админ подтвердил регистрацию
function sendUserConfirm(login, name){
    const telo = `
        Здравствуйте, ${name}</br>
        Ваша учетная запись подтверждена администратором и доступна для работы в приложении.</br>
        Для авторизации используйте логин и пароль, указанные при регистрации
        </br>
        Если у вас возникли вопросы или вам требуется помощь, 
        не стесняйтесь связаться с нашей службой поддержки <a href="mailto:it@grdn.ru&body=Веб приложение">it@grdn.ru</a>
        </br>
        Спасибо за ваше терпение!
        </br>
        </br>
        <i>Письмо отправлено сервером, не отвечайте на него!</i>
    `

    sendNewMail(login, 'Предоставлен доступ в приложение Guardian', telo)
}
// пароль заменил админ
function sendResetPassByAdmin(login, pass, name){
    const telo = `
        Здравствуйте, ${name}</br>
        Ваш пароль был изменен администратором. Для продолжения работы в приложении используйте пароль:</br>
        ${pass}</br>
        </br>
        Если у вас возникли вопросы или вам требуется помощь, 
        не стесняйтесь связаться с нашей службой поддержки <a href="mailto:it@grdn.ru&body=Веб приложение">it@grdn.ru</a>
        </br>
        </br>
        </br>
        <i>Письмо отправлено сервером, не отвечайте на него!</i>
    `
    sendNewMail(login, 'Смена пароля администратором в приложении Guardian', telo)
}


module.exports = {
    sendUserReg, sendResetPassByAdmin, sendUserConfirm
}