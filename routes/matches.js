var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crick');
var db = mongoose.connection;
var express = require('express');
var router = express.Router();

var Match = require('../models/match');


router.get('/fix', ensureAuthenticated, (req, res)=>{
  res.render('fix', {team : req.user});
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/getallteam', ensureAuthenticated, (req, res)=> {

  db.collection('teams').find({}).toArray((err, result) =>{
    if (err) throw err;
    if (!result) {
      console.log("no result avaialble!!!");
    }
    else {
      res.send(result);
      // console.log("This is result :"+result);
    }
  });
});


module.exports = router;
