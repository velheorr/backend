const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const Transport = require("../models/Transport");
const {checkTokenDate} = require("../functions/token");

/*Portal Transport add new item*/
router.post('/',
    body('name'),
    body('car'),body('carmodel'),
    body('number'),
    body('phone').isLength({min: '3'}),
    async (req, res)=>{
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).send('Authorization header is missing');
            }
            const bearer = authHeader.split(' ')[1];
            const token = await checkTokenDate(bearer)
            if (token.token){
                const errors = validationResult(req)
                const {name, car, number, phone,carmodel,  _id} = req.body

                if (!errors.isEmpty()){
                    return res.status(400).json({success: false, errors: errors.array()})
                }
                let transportItem;

                if (_id){
                    await Transport.replaceOne({"_id": _id}, {'name': name, 'car': car, 'number': number, 'phone': phone, 'carmodel': carmodel})
                } else {
                    transportItem = new Transport({name, car,number, phone, carmodel})
                    await transportItem.save()
                }
                const result = {id: 200,message: "Номер успешно добавлен", name: name, phone: phone}
                res.json({result})
            }
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })

/*Portal Transport*/
router.get('/', async (req, res) => {
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send('Authorization header is missing');
        }
        const bearer = authHeader.split(' ')[1];
        const token = await checkTokenDate(bearer)
        console.log(token)
        if (token.token){
            const collection = await Transport.find({})
            res.json(collection)
        }

    }catch (e) {
        console.log(e)
    }
})

/*Portal Transport DELETE*/
router.delete('/', async (req, res) =>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send('Authorization header is missing');
        }
        const bearer = authHeader.split(' ')[1];
        const token = await checkTokenDate(bearer)
        if (token.token){
            await Transport.deleteOne(req.body.id)
            const result = {id: 200,message: "Номер успешно удален"}
            res.json(result)
        }

    }catch (e) {
        console.log(e)
    }

});




module.exports = router;