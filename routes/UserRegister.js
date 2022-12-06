const { Router } = require('express');
require("dotenv").config();
const router = Router();
const { SendMail } = require('../lib/Email')
const {TokenGenerate , checkEmail , checkparamSize} = require('../lib/Validation')
require('../lib/database');
const { generate_token } = require('../lib/TokenGenerator');





// Register Route


router.post('/register', async (req,res) =>{
    const { username , password , email } = req.query
    if(checkparamSize(username,"username") && checkparamSize(password,"password") && checkparamSize(email,"email")){
        if(checkEmail(email)){
            if( username && password && email){
                const StartTime = Date.now()
                // Generate Token & storing with email inside Temporary Database 
                var Token = TokenGenerate()
                await knex('tempuser').insert({ email: email , validtoken: Token , username: username, password: password,regdate: StartTime});
                // Sending email verification
                SendMail(email,Token)  
                res.status(200).send({ msg : "We have sent a verification key to your email. You have 2 minutes to confirm your registration"})          
            }else{
                res.status(400).send("Error 400")
            }
        }else {
            res.status(400).send("Email is not a valid one. Accepted emails are Gmail, Outlook, or Yahoo")
        }
    }else{ 
        res.status(400).send({msg : "ERROR: parameters size reached the limit length"})
    }
})


// Validation Route


router.get('/emailvalidation', async (req, res) => {


    const validationdate = Date.now()
    const { validtoken ,  UEmail } = req.query


    if(checkparamSize(validtoken,"validToken") && checkparamSize(UEmail,"email")){

        // Check expire date

        var registerdate = await knex('tempuser').where({
            email: UEmail
        }).select('regdate')

        registerdate = registerdate[0].regdate

        if((validationdate-registerdate) < process.env.Token_Expire_Date){

            var Token = await knex('tempuser').where({
                email: UEmail
            }).select('validToken');
            Token = Token[0].validToken
            var UserUsername = await knex('tempuser').where({
                validToken: validtoken
            }).select('username');
            UserUsername = UserUsername[0].username
            var UserPass = await knex('tempuser').where({
                validToken: validtoken
            }).select('password');
            UserPass = UserPass[0].password
            var UserEmail = await knex('tempuser').where({
                validToken: validtoken
            }).select('email');
            UserEmail = UserEmail[0].email

            if(Token && UserUsername && UserPass && validtoken && UEmail && UserEmail){

                if(validtoken == Token && UEmail == UserEmail){
                    const accesstoken = generate_token(500)
                    // Here should pass all username and password an email to main database

                    await knex('users').insert({
                        username : UserUsername,
                        password : UserPass,
                        email : UserEmail,
                        accesstoken : accesstoken
                    });
                    // delete from tempuser
                    await knex('tempuser').where('validToken', validtoken).del()

                    res.status(200).send({ emailStatus : "Verification Completed Successfuly ", accessToken : accesstoken })
                }else {
                    res.status(403).send({ msg : "403 Error: Permission Denied" })
                }

            }else {
                res.status(400).send({ msg : "400 Error : USER_BAD_INPUT"})
            }
        }else{
            await knex('tempuser').where('validToken', validtoken).del()
            res.status(403).send({ msg : "403 Error : Token has been expired"})
        }
    }else{ 
        res.status(400).send({msg : "ERROR: parameters size reached the limit length"})
    }
})

module.exports = router;





