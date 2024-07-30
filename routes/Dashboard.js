const express = require('express')
const axios = require("axios");
const router = express.Router()

/*DASHBOARD получить основные данные для графиков*/
router.get('/', async (req, res) => {
    try{
        const x = (await axios.get("https://mail.grdn.ru:777/upp_hs_ap/hs/v3/GetBlocSales")).data.response.data

        res.json(x)
    }catch (e) {
        console.log(e)
    }
})

module.exports = router;