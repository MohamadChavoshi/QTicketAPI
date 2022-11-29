const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const UserRegister = require('./routes/UserRegister');
const CodeCenter = require('./routes/CodeCenter')
const app = express()


 

app.get('/', (req,res) => {
    res.status(200).send({
         Status : "Connecttion Successful"
    })
})


app.use('/UserRegister', UserRegister);
app.use('/CodeCenter', CodeCenter);


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(3443, () => console.log('[+] Server Start on SSL ( Port 3443 ) ...'))