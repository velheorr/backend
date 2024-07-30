
// Функция для шифрования пароля
const CryptoJS = require("crypto-js");

// Задаем секретный ключ для шифрования
const secretKey = process.env.SECRET_TEXT;


function encryptPassword(password, secretKey) {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
}

// Функция для расшифровки пароля
function decryptPassword(encryptedPassword, secretKey) {
    const bytes  = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}



function encrypt(pass) {
    // Шифруем пароль
    const encryptedPassword = encryptPassword(pass, secretKey);
    /*console.log('Зашифрованный пароль:', encryptedPassword);*/
    return encryptedPassword
}


function checkPass(pass, bdpass) {
    // Расшифровываем пароль
    const decryptedPassword = decryptPassword(bdpass, secretKey);
    /*console.log('Расшифрованный пароль:', decryptedPassword);*/
    if (pass === decryptedPassword){
        return true
    }
}


module.exports = encrypt, checkPass
