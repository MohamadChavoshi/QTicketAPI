const { Router } = require('express');
const router = Router();
const {TokenValidator} = require('../lib/Validation')
require('../lib/database');
const { generate_token } = require('../lib/TokenGenerator');





router.post('/app', async (req,res) => {
    const {username , password , email} = req.query
    if((username || email )&& password){
        const UserName = await knex("users").select("username").where("password",password)
        const UserEmail = await knex("users").select("email").where("password",password)
        if(UserEmail[0] != undefined || UserName[0] != undefined){
            if (UserName[0].username == username || UserEmail[0].email == email){
                
                if(email == ""){
                    var AccessToken = await knex("users").select("accesstoken").where("username",username)
                    if(AccessToken[0] != undefined){
                        AccessToken = AccessToken[0].accesstoken
                        res.status(200).send({ accesstoken : AccessToken})
                    }else{
                        res.status(404).send( { msg : "Username OR password are incorrect "})
                    }
                }else if (username == ""){
                    var AccessToken = await knex("users").select("accesstoken").where("email",email)
                    if(AccessToken[0] != undefined){
                        AccessToken = AccessToken[0].accesstoken
                        res.status(200).send({ accesstoken : AccessToken})
                    }else{
                        res.status(404).send( { msg : "Username OR password are incorrect "})
                    }
                }else {
                    var AccessToken = await knex("users").select("accesstoken").where("email",email)
                    if(AccessToken[0] != undefined){
                        AccessToken = AccessToken[0].accesstoken
                        res.status(200).send({ accesstoken : AccessToken})
                    }else{
                        res.status(404).send( { msg : "Username OR password are incorrect "})
                    }
                }

            }else {
                res.status(404).send( { msg : "Username OR password are incorrect "})
            }
        }else{
            res.status(404).send( { msg : "Username OR password are incorrect "})
        }

    }else{ 
        res.status(400).send( { msg : "ERROR 400 : Bad user input"})
    }
})



module.exports = router;