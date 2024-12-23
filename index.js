const express = require('express');
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose');


const phoneBookRoute = require('./routes/PhoneBook')
const transportRoute = require('./routes/Transport')
const iptablesRoute = require('./routes/Inventory/IPTables')
const hardwareRoute = require('./routes/Inventory/Hardware')
const licenceRoute = require('./routes/Inventory/Licence')
const userRoute = require('./routes/User')
const iBoardRoute = require('./routes/iBoard')
const dashBoardRoute = require('./routes/Dashboard')
const testRoute = require('./routes/test/test')


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/portal/phoneBook', phoneBookRoute)
app.use('/api/portal/transport', transportRoute)
app.use('/api/portal/inventory/licence', licenceRoute)
app.use('/api/portal/inventory/iptables', iptablesRoute)
app.use('/api/portal/inventory/hardware', hardwareRoute)
app.use('/api', userRoute)
app.use('/api/iboardData', iBoardRoute)
app.use('/api/dashboarddata', dashBoardRoute)
app.use('/api/test', testRoute)



const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            /*Local*/
            tlsCAFile: process.env.TLS_CA_FILE_LOC,
            tlsCertificateKeyFile: process.env.TLS_CRT_FILE_LOC,
            /*Production*/
            //tlsCAFile: process.env.TLS_CA_FILE,
            //tlsCertificateKeyFile: process.env.TLS_CRT_FILE,
        })
            .then(() => console.log('Успешное подключение к MongoDB с SSL'))
            .catch(err => console.error('Ошибка подключения к MongoDB:', err))
        app.listen(process.env.PORT, ()=> console.log(`server started: ${process.env.PORT}`)  )
    } catch (e){
        console.log(e)
        process.exit(1)
    }
}

start()


