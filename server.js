const express = require('express')
const app = express()


app.get('/', (req,res) => {
    res.sendStatus(200).send({msg : "Connected Successful"})
})


app.listen(3000 , () => console.log('[+]   Server Started ... '))