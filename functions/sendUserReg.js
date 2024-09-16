const transporter = require('./mailConfig');

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
    // Настройки письма
    let mailOptions = {
        from: 'no_reply@s3grdn.ru',
        to: login,
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

module.exports = sendUserReg