const express = require('express')
const app = express()


app.get('/', (req,res) => {
    res.sendStatus(200).send({msg : "Connected Successful"})
    // test new pull request
})


app.listen(3000 , () => console.log('[+]   Server Started ... '))