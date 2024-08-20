const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const IPtables = require("../../models/Invenory/IPtables");

/*Portal Licence add new item*/
router.post('/',
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            const {ip, type, name, info, notes, _id} = req.body

            if (!errors.isEmpty()){
                return res.status(400).json({success: false, errors: errors.array()})
            }
            let ipItem;

            if (_id){
                await IPtables.replaceOne({"_id": _id}, {
                    'ip': ip, 'type': type, 'name': name, 'info': info, 'info': info,'notes': notes,
                })
            } else {
                ipItem = new IPtables({ip, type, name, info, info, notes})
                await ipItem.save()
            }
            const result = {id: 200,message: "Запись успешно добавлена",}
            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })


router.get('/', async (req, res) => {
    try{
        const collection = await IPtables.find({})
        res.json(collection)
    }catch (e) {
        console.log(e)
    }
})


router.delete('/', async (req, res) =>{
    console.log(req.body.id)
    try{
        await IPtables.deleteOne(req.body.id)
        const result = {id: 200,message: "Номер успешно удален"}
        res.json(result)
    }catch (e) {
        console.log(e)
    }

});




module.exports = router;