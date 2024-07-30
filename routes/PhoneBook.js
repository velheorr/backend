const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const PhoneBook = require("../models/PhoneBook");


router.post('/',
    body('name').isLength({min: '3'}),
    body('position'),
    body('dep'),
    body('phone').isLength({min: '3'}),
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            const {name, position, dep, phone, _id} = req.body

            if (!errors.isEmpty()){
                return res.status(400).json({success: false, errors: errors.array()})
            }
            let phoneItem;

            if (_id){
                await PhoneBook.replaceOne({"_id": _id}, {'name': name, 'position': position, 'dep': dep, 'phone': phone})
            } else {
                phoneItem = new PhoneBook({name, position,dep, phone})
                await phoneItem.save()
            }


            const result = {id: 200,message: "Номер успешно добавлен", name: name, phone: phone}
            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })

/*Portal PhoneBook*/
router.get('/', async (req, res) => {
    try{
        const collection = await PhoneBook.find({})
        res.json(collection)
    }catch (e) {
        console.log(e)
    }
})

/*Portal PhoneBook DELETE*/
router.delete('/', async (req, res) =>{
    try{
        await PhoneBook.deleteOne(req.body.id)
        const result = {id: 200,message: "Номер успешно удален"}
        res.json(result)
    }catch (e) {
        console.log(e)
    }

});

module.exports = router;