const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DBString).then(()=>{
    console.log('Database Running')
})

