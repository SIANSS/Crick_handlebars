var express = require('express');
var router = express.Router();
var isloggedIn = false;


router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/fix', (req, res)=> {
    res.render('fix');
});


module.exports = router;
