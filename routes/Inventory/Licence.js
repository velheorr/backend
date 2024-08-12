const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const Licence = require("../../models/Invenory/Licence");

/*Portal Licence add new item*/
router.post('/',
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            const {org, seller, vendor, lic, key, start, exp, info, notes, amount,  _id} = req.body

            if (!errors.isEmpty()){
                return res.status(400).json({success: false, errors: errors.array()})
            }
            let licItem;

            if (_id){
                await Licence.replaceOne({"_id": _id}, {
                    'org': org, 'seller': seller, 'vendor': vendor, 'lic': lic, 'key': key,'start': start,'exp': exp,'info': info,'notes': notes,'amount': amount,
                })
            } else {
                licItem = new Licence({org, seller, vendor, lic, key, start, exp, info, notes, amount})
                await licItem.save()
            }
            const result = {id: 200,message: "Запись успешно добавлена",}
            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })

/*Portal Transport*/
router.get('/', async (req, res) => {
    try{
        const collection = await Licence.find({})
        res.json(collection)
    }catch (e) {
        console.log(e)
    }
})

/*Portal Transport DELETE*/
router.delete('/', async (req, res) =>{
    console.log(req.body.id)
    try{
        await Licence.deleteOne(req.body.id)
        const result = {id: 200,message: "Номер успешно удален"}
        res.json(result)
    }catch (e) {
        console.log(e)
    }

});




module.exports = router;