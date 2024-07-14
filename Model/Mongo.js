const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/Userdata").then(() => {
    console.log('Database connection successful')
}).catch(err => { console.log(err)})