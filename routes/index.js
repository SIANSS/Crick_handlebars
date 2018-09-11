var express = require('express');
var router = express.Router();


router.get('/fix', ensureAuthenticated, (req, res)=>{
  res.render('fix');
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;
// module.exports = ensureAuthenticated();
