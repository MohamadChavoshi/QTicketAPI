const express = require('express')
const db = require('mysql2')
const app = express()


app.get('/', (req,res) => {
    res.status(200).send({
         Status : "Connecttion Successful"
})
})

app.post('/register' , (req,res) =>{
    const { username , password } = req.query
    const { authorization } = req.header
    if(authorization && authorization == "test"){
        
    }
})


app.listen(3000 , () => console.log('[+]   Server Started ... '))