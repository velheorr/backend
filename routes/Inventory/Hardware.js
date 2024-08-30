const express = require('express')
const router = express.Router()
const {body, validationResult} = require("express-validator");
const Hardware = require("../../models/Invenory/Hardware");
const Rent = require("../../models/Invenory/Rent");

/*Portal Licence add new item*/
router.post('/',
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            const {
                name, type, price, inventory, factory,date,note, _id, start, end, person
            } = req.body

            if (!errors.isEmpty()){
                return res.status(400).json({success: false, errors: errors.array()})
            }
            let hardwareItem;

            if (_id){
                await Hardware.replaceOne({"_id": _id}, {
                    'name': name, 'type': type, 'price': price,'inventory': inventory,'factory': factory,'date': date,'note': note,
                    'start': start, 'end': end, 'person': person
                })
            } else {
                hardwareItem = new Hardware({
                    name, type, price, inventory, factory, date, note, status: false, start: '', end: '', person:''
                })
                await hardwareItem.save()
            }
            const result = {id: 200,message: "Запись успешно добавлена",}
            res.json({result})
        }catch (e) {
            res.status(500).send({message: e.message})
        }
    })
router.post('/rent',
    async (req, res)=>{
        try {
            const {status, start, end, person, _id, inventory, whoGet} = req.body
            /*true Значит что выдали*/
            if (!status){
                await Hardware.findOneAndUpdate({_id: _id},
                    {
                        $set: {
                            status: true,
                            start: start,
                            end: end,
                            person: person,
                        }

                    })
            } else {
                /*false  вернули*/
                let endDate
                const date = new Date()
                end.length < 2 ? endDate = date.toISOString().slice(0, 10) : endDate = end
                await Hardware.findOneAndUpdate({_id: _id},
                    {
                        $set: {
                            status: false,
                            start: '',
                            end: '',
                            person: '',

                        }
                    })
                const hardwareItemRent = new Rent({
                    status, start, 'end': endDate, person, inventory, whoGet
                })
                await hardwareItemRent.save()
            }


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

router.get('/rent/:what', async (req, res) => {
    try{
        const hardwareInv = req.params["what"]
        const collection = await Rent.find({'inventory': hardwareInv})
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