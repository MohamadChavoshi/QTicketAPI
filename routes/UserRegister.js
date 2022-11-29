const { Router } = require('express');
const router = Router();
const { SendMail } = require('../lib/Email')
const {TokenGenerate , checkEmail} = require('../lib/Validation')
require('../lib/database');
const { default: knex, Knex } = require('knex');
const {generate_token} = require('../lib/TokenGenerator')





// Register Route


router.post('/register', (req,res) =>{
    const { username , password , email } = req.query
    if(checkEmail(email)){
        if( username && password && email){
            // Generate Token & storing with email inside Temporary Database 
            var Token = TokenGenerate()
            // db.promise().query(`INSERT INTO tempuser(email , validToken, username , password) VALUES('${email}','${Token}', '${username}', '${password}')`);
            knex('tempuser').insert([{ email: email },{ validtoken: Token},{username: username},{password: password}]);
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
            // db.promise().query(`DELETE FROM tempuser WHERE email=${email} AND validToken=${Token}`);
            knex('tempuser').where({validToken: Token}).andWhere({email: email}).delete()
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
    // var Token = db.promise().query(`select validToken from tempuser where email=${UEmail}`)
    var Token = knex('tempuser').where({
        email: UEmail
    }).select('validToken');
    // var UserUsername = db.promise().query(`select username from tempuser where validToken=${validtoken}`)
    var UserUsername = knex('tempuser').where({
        validToken: validtoken
    }).select('username');
    // var UserPass = db.promise().query(`select password from tempuser where validToken=${validtoken}`)
    var UserPass = knex('tempuser').where({
        validToken: validtoken
    }).select('password');
    // var UserEmail = db.promise().query(`select email from tempuser where validToken=${validtoken}`)
    var UserEmail = knex('tempuser').where({
        validToken: validtoken
    }).select('email');
    if(Token && UserUsername && UserPass && validtoken && UEmail && UserEmail){

        if(validtoken == Token && UEmail == UserEmail){
            const accesstoken = generate_token(500)
            res.status(200).send({ emailStatus : "Verification Completed Successfuly ", accessToken : accesstoken })
            // Here should pass all username and password an email to main database
            // db.promise().query(`INSERT INTO users(username , password , email) VALUES('${UserUsername}', '${UserPass}', '${UserEmail}')`)
            knex('users').insert([
                {username : UserUsername},
                {password : UserPass},
                {email : UserEmail},
                {accesstoken : accesstoken}
            ]);
        }else {
            res.status(403).send({ msg : "403 Error: Permission Denied" })
        }

    }else {
        res.status(400).send({ msg : "400 Error : USER_BAD_INPUT"})
    }

})

module.exports = router;





