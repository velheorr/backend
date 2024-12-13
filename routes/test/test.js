const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const TestUsers = require('../../models/test/test');

/*test*/
router.post('/',
    body('name'),
    body('email').isEmail(),
    body('login'),
    body('password').isNumeric().isLength({min: '3'}),
    body('dateOfBirth'),
    body('gender').isBoolean(),
    body('date'),
    async (req, res)=>{
        try {
                const errors = validationResult(req)
                const {name, email, login, password,dateOfBirth, gender, date, _id} = req.body

                if (!errors.isEmpty()){
                    return res.status(400).json({success: false, errors: errors.array()})
                }
                let testItem;

                if (_id){
                    await TestUsers.replaceOne({"_id": _id}, {'name': name, 'email': email, 'login': login,
                        'password': password, 'dateOfBirth': dateOfBirth, 'gender':gender, 'date': date})
                } else {
                    testItem = new TestUsers({name, email, login, password,dateOfBirth, gender, date})
                    await testItem.save()
                }
                const result = {id: 200,message: "Пользователь успешно добавлен", name: name, login: login}
                res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })

/*Portal Transport*/
router.get('/', async (req, res) => {
    try{
        const collection = await TestUsers.find({})
        res.json(collection)
    }catch (e) {
        console.log(e)
    }
})

/*Portal Transport DELETE*/
router.delete('/', async (req, res) =>{
    try{
            await TestUsers.deleteOne(req.body.id)
            const result = {id: 200,message: "Номер успешно удален"}
            res.json(result)
    }catch (e) {
        console.log(e)
    }

});




module.exports = router;