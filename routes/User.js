const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const User = require("../models/User");
const AuthLog = require("../models/AuthLog");
const Auth = require("../models/Auth");
const ResetPassword = require("../models/ResetPassword")
const encrypt = require("../functions/encryptPassword");
const {tokenize, checkTokenDate} = require("../functions/token");
const sendResetPasswordMail = require("../functions/mail/sendResetPasswordMail");
const sendAdminReg = require('../functions/mail/sendAdminRegConfirm')
const sendUserReg = require('../functions/mail/sendUserReg')


router.get('/user', async (req, res) => {
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send('Authorization header is missing');
        }
        const bearer = authHeader.split(' ')[1];
        const token = await checkTokenDate(bearer)
        if (token.token){
            const collection = await User.find({})
            const newCollection = collection.map(i => {
                return {
                    _id: i._id,
                    login: i.login,
                    name: i.name,
                    position: i.position,
                    dashboard: i.auth.dashboard,
                    iboard: i.auth.iboard,
                    portal: i.auth.portal,
                }
            })
            res.json(newCollection)
        }
    }catch (e) {
        console.log(e)
    }
})
router.post('/user',
    async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).send('Authorization header is missing');
            }
            const bearer = authHeader.split(' ')[1];
            const token = await checkTokenDate(bearer)

            if (token.token){
                const {name, login, position, iboard, dashboard, portal, _id} = req.body
                await User.findOneAndUpdate({_id: _id},
                    {
                        $set: {
                            name: name,
                            login: login,
                            position: position,
                            auth: {
                                iboard: iboard,
                                dashboard: dashboard,
                                portal: portal,
                            }
                        }

                    })
                const result = {id: 200,message: "Данные обновлены"}
                res.json({result})
            }


        } catch (e) {
            console.log(e)
        }
    })


/*Общая регистрация*/
router.post('/register',
    body('login').isEmail(),
    body('password').isLength({min: '4'}),
    body('name'),
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            const {login, password, name} = req.body

            const checkUniqueName = await User.findOne({ login: login })

            if (checkUniqueName){
                return res.status(409).json({ message: 'name already exist' })
            }
            if (!errors.isEmpty()){
                return res.status(400).json({success: false, errors: errors.array()})
            }

            const ecryptedPASS = encrypt(password)
            const userNew = new User({login, 'password': ecryptedPASS,name,position: '', auth: {dashboard: false, iboard: false, portal: false}})
            await userNew.save()
            sendAdminReg(login, name)
            sendUserReg(login, name)
            const result = {id: 200,message: "Пользователь успешно зарегистрирован", name: name, login: login}
            /*res.json({user})*/

            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })

/*Сброс пароля */
router.post('/resetPassword',async (req, res)=>{
    try {
        const {login} = req.body
        const checkLogin = await User.findOne({login})
        if (!checkLogin){
            return res.status(401).json({ message: 'Неверный имейл' })
        } else {
            const checkEmail = await ResetPassword.findOne({login})
            if (checkEmail){
                await ResetPassword.findOneAndDelete({login})
            }
            const date = new Date().toISOString().slice(0, 10)
            const random = Math.random() * Math.random() + date
            const newReset = {
                tempLink: random,
                date: date,
                email: login,
            }
            const resetPass = new ResetPassword(newReset)
            await resetPass.save()
            const link = `https://iboard.s3grdn.ru/resetPassword/:${random}`
            sendResetPasswordMail(checkLogin, link)
            const result = {message: 'Ссылка отправлена'}
            return res.json(result)
        }

    }catch (e) {
        res.status(500).send({message: e.message})
    }
})
router.post('/newPassword/:labuda',async (req, res)=>{
    try {
        const password = req.body.password
        const checkLink = req.params["labuda"]
        const date = new Date().toISOString().slice(0, 10)
        const confirm = await ResetPassword.findOne({tempLink: checkLink})
        if (confirm && confirm.date === date){
            const ecryptedPASS = encrypt(password)
            await User.findOneAndUpdate({login: confirm.email},{$set: {password: ecryptedPASS,}})
            await ResetPassword.findOneAndDelete({email: confirm.email})
        }
    }catch (e) {
        res.status(500).send({message: e.message})
    }
})


/*Общая авторизация */
router.post('/login',async (req, res)=>{
    try {
        const {login, password, from} = req.body
        const ecryptedPASS = encrypt(password)
        const checkLogin = await User.findOne({login: login})
        if (!checkLogin && ecryptedPASS !== checkLogin.password){
            return res.status(401).json({ message: 'Неверный логин или пароль' })
        } else if(!checkLogin.auth[from]) {
            return res.status(401).json({ message: 'У вас нет доступа для входа в систему' })
        } else {
            // логирование
            const date = new Date()
            const sliceDate = date.toISOString().slice(0, 19)
            let log = {
                name: login,
                target: from,
                date: sliceDate,
                operation: 'login',
            }
            const log_txt = new AuthLog(log)
            await log_txt.save()
            // токенизация
            const token = await tokenize(checkLogin.name, from, login)
            const result = {
                message: "Авторизация успешна",
                name: checkLogin.name,
                token,
            }
            return res.json(result)
        }
    }catch (e) {
        res.status(500).send({message: e.message})
    }
})
/*реавторизация в течении дня */
router.post('/reauth',async (req, res)=>{
    try {
        const {token} = req.body
        if (!token) {
            return res.status(400).send({ message: 'Token is required' });
        }
        let check = await checkTokenDate(token);
        return res.json(check);
    }catch (e) {
        res.status(500).send({message: e.message})
    }
})


module.exports = router;