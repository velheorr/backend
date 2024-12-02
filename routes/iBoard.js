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

/*IBOARD Получить данные блока экономики */  /*OLD OLD OLD OLD OLD OLD OLD */
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

/*IBOARD Получить данные блока экономики линейный график */
router.get('/eco/linechart/:year/:type', async (req, res) => {
    const year = req.params.year;
    const type = req.params.type;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEconNarastaushimItogom/${year}/${type}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})
/*IBOARD Получить данные блока экономики столбиковый график */
router.get('/eco/barchart/:year/:type', async (req, res) => {
    const year = req.params.year;
    const type = req.params.type;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEconMesyachniePokazateli/${year}/${type}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})
/*IBOARD Получить данные блока экономики карточки */
router.get('/eco/cards/:year/:month/:type', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const type = req.params.type;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEconPlitki/${year}/${month}/${type}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})

/*IBOARD Получить данные блока экономики воронки */
router.get('/eco/funnel/:year/:month/:rp/:type', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const rp = req.params.rp;
    const type = req.params.type;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEconFunnel/${year}/${month}/${rp}/${type}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})
/*IBOARD Получить данные блока экономики двойного графика */
router.get('/eco/twocharts/:year/:month/:rp/:type', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const rp = req.params.rp;
    const type = req.params.type;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEcon2Charts/${year}/${month}/${rp}/${type}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})
/*IBOARD Получить данные блока экономики Пулевого графика */
router.get('/eco/bullet/:year/:month/:rp/:type', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const rp = req.params.rp;
    const type = req.params.type;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEconBullet/${year}/${month}/${rp}/${type}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})

/*IBOARD Получить данные блока экономики детализация воронки */
router.get('/eco/funneldetails/:year/:month/:type/:rp/:par', async (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const rp = req.params.rp;
    const type = req.params.type;
    const par = req.params.par;
    const url = `https://mail.grdn.ru:777/upp_hs/hs/v3/getEconFunnelDetails/${year}/${month}/${type}/${rp}/${par}`;
    try {
        const response = await axios.get(url);
        res.json(response.data)
    }catch (e) {
        console.log(e)
    }
})

module.exports = router;

