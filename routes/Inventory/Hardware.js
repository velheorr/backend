const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const Hardware = require("../../models/Invenory/Hardware");
const User = require("../../models/User");

/*Portal Licence add new item*/
router.post('/',
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            const {
                name, type, price, inventory, factory,date,note, _id,
            } = req.body

            if (!errors.isEmpty()){
                return res.status(400).json({success: false, errors: errors.array()})
            }
            let hardwareItem;

            if (_id){
                await Hardware.replaceOne({"_id": _id}, {
                    'name': name, 'type': type, 'price': price,'inventory': inventory,'factory': factory,'date': date,'note': note,
                })
            } else {
                hardwareItem = new Hardware({name, type, price, inventory, factory, date, note})
                await hardwareItem.save()
            }
            const result = {id: 200,message: "Запись успешно добавлена",}
            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })
router.post('/startrent',
    async (req, res)=>{
        try {
            const {status, start, end, person, _id} = req.body
            await User.findOneAndUpdate({_id: _id},
                {
                    $set: {
                        status: status,
                        start: start,
                        end: end,
                        person: person,
                    }

                })
            const result = {id: 200,message: "Данные обновлены"}
            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })


router.get('/', async (req, res) => {
    try{
        const collection = await Hardware.find({})
        res.json(collection)
    }catch (e) {
        console.log(e)
    }
})


/*router.delete('/', async (req, res) =>{
    console.log(req.body.id)
    try{
        await Hardware.deleteOne(req.body.id)
        const result = {id: 200,message: "Запись успешно удалена"}
        res.json(result)
    }catch (e) {
        console.log(e)
    }

});*/




module.exports = router;