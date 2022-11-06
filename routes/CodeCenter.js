const { Router } = require('express');
const router = Router();
const db = require('../lib/database');




router.post('/storingcode', (req,res) => {
    var { RECCode } = req.query
    db.promise().query(``)
})