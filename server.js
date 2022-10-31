const express = require('express')
const db = require('./lib/database')
const {TokenGenerate , checkEmail} = require('./lib/Validation')
const { SendMail } = require('./lib/Email')
const app = express()


var Token;



app.get('/', (req,res) => {
    res.status(200).send({
         Status : "Connecttion Successful"
})
})

app.post('/register' , (req,res) =>{
    const { username , password , email } = req.query
    if(checkEmail(email)){
        if( username && password && email){
            // Generate Token & storing with email inside Temporary Database 
            Token = TokenGenerate();
            db.promise().query(`INSERT INTO tempuser(email , validToken) VALUES('${email}','${Token}')`);
            // Sending email verification
            SendMail(email,Token)
        // Here is Expieration Time
            const expierDate = 120000;
            var StartTime = Date().getTime();
            for (i = 0; i < 1000;i++){
                // This is just for making delay in time
            }
            var time = Date().getTime();
            while(time < expierDate){
                time = StartTime - Date().getTime();
            }
            // Token will expire now 
            db.promise().query(`DELETE FROM tempuser WHERE email=${email} AND validToken=${Token}`);
        }else{
            res.status(400).send("Error 400")
        }
    }else {
        res.status(400).send("Email is not a valid one. Accepted emails are Gmail, Outlook, or Yahoo")
    }
})


app.get('/emailvalidation', (req, res) => {
    const { validtoken } = req.query
    if(validtoken && validtoken == Token){
        res.status(200).send({ emailStatus : "Verification Completed Successfuly " })
        // Here should pass all username and password an email to main database 
    }else {
        res.status(403).send({ msg : "403 Error: Permission Denied" })
    }
})

app.listen(3000 , () => console.log('[+]   Server Started ... '))