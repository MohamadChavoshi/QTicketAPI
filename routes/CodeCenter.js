const { Router } = require('express');
const router = Router();
const db = require('../lib/database');



router.post('/storingcode', (req,res) => {
    var { RECCode , GUID} = req.query
    res.status(200)
})


module.exports = router;