const Auth = require("../models/Auth");
const encrypt = require("./encryptPassword");



const date = new Date()
const sliceDate = date.toISOString().slice(0, 10)

async function tokenize(name, from, login) {
    // токенизация
    const random = Math.random().toFixed(7)
    const token = encrypt(`${sliceDate}${random}/`)
    const authNew = new Auth({
        name,
        target: from,
        login,
        token,
        date: sliceDate,
    })
    await authNew.save()
    const list = await Auth.find({ login: login })
    const clean = list.filter(i => i.date !== sliceDate).map(i => i._id)
    if (clean.length > 0) {
        await Auth.deleteMany({ _id: { $in: clean } });
    }
    return token
}

async function checkTokenDate(token) {
    try {
        const tokenUser = await Auth.findOne({ token: token }, 'name date token login')
        if (!tokenUser) {
            return false; // Токен не найден
        }
        const userDate = tokenUser.date;
        if (sliceDate === userDate) {
            return {name: tokenUser.name, token: tokenUser.token, login: tokenUser.login}; // Токен действителен
        } else {
            await Auth.deleteMany({name: tokenUser.name})
            return false; // Токен истек
        }
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        throw error; // Или обработайте ошибку по-другому
    }

}


module.exports = {
    tokenize,
    checkTokenDate
}