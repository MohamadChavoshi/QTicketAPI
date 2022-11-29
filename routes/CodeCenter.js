const { Router } = require('express');
const router = Router();
knex = require('../lib/database');




router.post('/storingcode', async (req,res) => {
    var { RECCode , GUID} = req.query
    if(accessToken(req.headers.authorization) && RECCode && GUID){
        knex('coderepo').insert({Code: RECCode, GUID: GUID , accesstoken: req.headers.authorization})
    }else {
        res.status(403).send("403 Error unauthorized")
    }

})


module.exports = router;