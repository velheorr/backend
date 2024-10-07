const Auth = require("../models/Auth");
const encrypt = require("./encryptPassword");



const date = new Date()
const sliceDate = date.toISOString().slice(0, 10)

async function tokenize(login, from) {
    // токенизация
    const random = Math.random().toFixed(7)
    const token = encrypt(`${sliceDate}${random}/`)
    const authNew = new Auth({
        name: login,
        target: from,
        token,
        date: sliceDate,
    })
    await authNew.save()
    /*const check = await checkTokenDate('U2FsdGVkX1/PpkxYuPm7v3rF4lkGs4kcpJI9MOM9LrbGppUUpeqsLVbhprlhCOpy')*/
    return token
}

async function checkTokenDate(token) {
    const tokenUser = await Auth.findOne({token: token})
    if (!tokenUser) {
        console.log('Token not found');
        return false; // Токен не найден
    }

    const userDate = tokenUser.date;

    if (sliceDate == userDate) {
        console.log('Token valid');
        return true; // Токен действителен
    } else {
        console.log('Token is expired');
        return false; // Токен истек
    }


}


module.exports = tokenize