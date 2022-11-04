const express = require('express')
const UserRegister = require('./routes/UserRegister');
const app = express()



app.get('/', (req,res) => {
    res.status(200).send({
         Status : "Connecttion Successful"
    })
})


app.use('/UserRegister', UserRegister);



app.listen(3000 , () => console.log('[+]   Server Started ... '))