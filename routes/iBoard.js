const express = require('express')
const axios = require("axios");
const router = express.Router()
const convertMonth = require("../functions/convertMonth");

/*IBOARD Получить данные блока реализация*/
router.get('/', async (req, res) => {
    try{
        const x = (await axios.get("https://mail.grdn.ru:777/upp_hs_ap/hs/v3/GetSales")).data.response
        const xData = await x.data
        const xProjectTeam = await x.ProjectTeam
        let arr = [];

        const objectById = {};
        for (const object of xProjectTeam) {
            objectById[object.КодОбъекта] = object;
        }

        xData?.forEach(item => {
            let newItem = item['КодОбъекта']
            let x = Object.assign({}, item,objectById[newItem])
            arr.push(x)
        })
        res.json(arr)
    }catch (e) {
        console.log(e)
    }
})

/*IBOARD Получить данные блока экономики */
router.get('/economics/:year/:month', async (req, res) => {
    try{
        const year = req.params["year"]
        const month = req.params["month"]
        let check = convertMonth(month)
        const x = (await axios.get(`https://mail.grdn.ru:777/upp_hs_ap/hs/v3/GetEconomyInDynamics/${year}?month=${check}`)).data
        res.json(x)
    }catch (e) {
        console.log(e)
    }
})


module.exports = router;