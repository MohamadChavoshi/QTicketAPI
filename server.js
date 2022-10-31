const express = require('express')
const db = require('./database')
const app = express()





app.get('/', (req,res) => {
    res.status(200).send({
         Status : "Connecttion Successful"
})
})

app.post('/register' , (req,res) =>{
    const { username , password , email } = req.query
    const { authorization } = req.header
    if(authorization && authorization == "test"){
        db.promise().query(``)
    }
})


app.listen(3000 , () => console.log('[+]   Server Started ... '))