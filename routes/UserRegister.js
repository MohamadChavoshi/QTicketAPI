const { Router } = require('express');
const router = Router();
const { SendMail } = require('../lib/Email')
const {TokenGenerate , checkEmail} = require('../lib/Validation')
const db = require('../lib/database')






// Register Route


router.post('/register', (req,res) =>{
    const { username , password , email } = req.query
    if(checkEmail(email)){
        if( username && password && email){
            // Generate Token & storing with email inside Temporary Database 
            var Token = TokenGenerate();
            db.promise().query(`INSERT INTO tempuser(email , validToken, username , password) VALUES('${email}','${Token}', '${username}', '${password}')`);
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



// Validation Route


router.get('/emailvalidation', (req, res) => {

    const { validtoken ,  UEmail } = req.query
    var Token = db.promise().query(`select validToken from tempuser where email=${UEmail}`)
    var UserUsername = db.promise().query(`select username from tempuser where validToken=${validtoken}`)
    var UserPass = db.promise().query(`select password from tempuser where validToken=${validtoken}`)
    var UserEmail = db.promise().query(`select email from tempuser where validToken=${validtoken}`)
    if(Token && UserUsername && UserPass && validtoken && UEmail && UserEmail){

        if(validtoken == Token && UEmail == UserEmail){

            res.status(200).send({ emailStatus : "Verification Completed Successfuly " })
            // Here should pass all username and password an email to main database
            db.promise().query(`INSERT INTO users(username , password , email) VALUES('${UserUsername}', '${UserPass}', '${UserEmail}')`)
        }else {
            res.status(403).send({ msg : "403 Error: Permission Denied" })
        }

    }else {
        res.status(400).send({ msg : "400 Error : USER_BAD_INPUT"})
    }

})

module.exports = router;


