const { Router } = require('express');
const router = Router();
const {TokenValidator} = require('../lib/Validation')
require('../lib/database');
const { generate_token } = require('../lib/TokenGenerator');





router.post('/app', async (req,res) => {
    const {username , password , email} = req.query
    if(username && password && token){
        const UserName = await knex("users").select("username").where("password",password)
        const UserEmail = await knex("users").select("email").where("password",password)

        if ( UserName[0] != undefined || UserName[0] == username || UserEmail[0] == email){
            const AccessToken = await knex("users").select("accesstoken").where("username",username)
            AccessToken = AccessToken[0].accesstoken
            res.send(200).send({ accesstoken : AccessToken})     
        }else {
            res.status(404).send( { msg : "Username OR password are incorrect "})
        }
    }else{ 
        res.status(400).send( { msg : "ERROR 400 : Bad user input"})
    }
})