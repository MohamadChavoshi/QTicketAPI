const { Router } = require('express');
const router = Router();
const {TokenValidator} = require('../lib/Validation')
knex = require('../lib/database');





router.post('/storingcode', async (req,res) => {
    var { RECCode , GUID} = req.query
    if(req.headers.authorization && RECCode && GUID){
        if(TokenValidator(req.headers.authorization)){
            knex('coderepo').insert({Code: RECCode, GUID: GUID , accesstoken: req.headers.authorization})
        }else{
            res.status(403).send("Permission denied : 403 ERROR unathorized")
        }
    }else {
        res.status(400).send("400 Error BAD USER INPUT")
    }

})



router.post('/codevalidator', async (req,res) => {
    var { RECCode, GUID} = req.query
    if(RECCode && req.headers.authorization && GUID){
        if(TokenValidator(req.headers.authorization)){
            let resault = await knex('coderepo').select('Code').where('GUID',GUID)
            resault = resault[0]
            if(resault == undefined){ 
                res.status(404).send({ res : 0})
            }
            else{
                res.status(200).send({ res : 1})
            }
        }else{
            res.status(403).send("Permission denied : 403 ERROR unathorized")
        }
    }else{
        res.status(400).send({ msg : "ERROR 400 : BAD USER INPURT"})
    }
})


module.exports = router;