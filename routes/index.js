module.exports = (router, passport)=>{

  router.get('/', (req, res)=>{
    res.render('index');
  })

  router.get('/about_us', (req, res)=>{
    res.render('about');
  })

  router.get('/connect', (req, res)=>{
    res.render('contact');
  })

  router.get('/forums', ensureAuthenticated, (req, res)=>{
    res.render('forum');
  });

  router.get('/usrlogin', (req, res)=>{
    res.render('loginuser');
  });

  router.post('/usrlogin', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  router.get('/usrregister', (req, res)=>{
    res.render('registeruser', { message:  req.flash('signupMessage')});
  });

  router.post('/usrregister', passport.authenticate('local-signup', {
    successRedirect : '/forums', // redirect to the secure profile section
    failureRedirect : '/usrregister', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  // router.post('/register_user', (req, res)=>{
  //
  //   var user_name = req.body.uname;
  //   var email = req.body.mail;
  //   var password = req.body.password;
  //   var password2 = req.body.password2;
  //
  //   req.checkBody('uname', 'Fullname is required').notEmpty();
  //   req.checkBody('email', 'Email is required').notEmpty();
  //   req.checkBody('password', 'password is required').notEmpty();
  //   req.checkBody('password2', 'passwords do not match').equals(password);
  //
  //   var errors = req.validationErrors();
  //
  //   if(errors){
  //     res.render('registeruser', {
  //       errors : errors
  //     })
  //   } else {
  //     Viewer.findOne({'local.email' : email}, (err, viewer)=>{
  //       if(err) throw err;
  //       if (viewer) {
  //         req.flash('error_msg', 'This email is already registered.');
  //         res.redirect('/usrregister');
  //
  //       } else {
  //         var newViewer = new Viewer();
  //
  //         newViewer.local.name = req.params.fullname,
  //         newViewer.local.email = req.params.email,
  //         newViewer.local.password = newViewer.generateHash(password)
  //
  //         Viewer.save(function(err) {
  //           if (err)
  //           throw err;
  //
  //           // if successful, return the new user
  //           return done(null, newViewer);
  //         });
  //
  //         req.flash('success_msg', 'you Team has been successfully registered');
  //         res.redirect('/usrlogin');
  //       }
  //     });
  //   };
  // });

  // facebook -------------------------------

  // send to facebook to do the authentication
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/forums',
    failureRedirect : '/usrlogin'
  }));

  // google ---------------------------------

  // send to google to do the authentication
  router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/forums',
    failureRedirect : '/usrlogin'
  }));

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================

  // // locally --------------------------------
  // router.get('/connect/local', function(req, res) {
  //   res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  // });
  // router.post('/connect/local', passport.authenticate('local-signup', {
  //   successRedirect : '/profile', // redirect to the secure profile section
  //   failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));
  //
  // facebook -------------------------------

  // send to facebook to do the authentication
  router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

  // handle the callback after facebook has authorized the user
  router.get('/connect/facebook/callback',
  passport.authorize('facebook', {
    successRedirect : '/forums',
    failureRedirect : '/usrlogin'
  }));


  // google ---------------------------------

  // send to google to do the authentication
  router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

  // the callback after google has authorized the user
  router.get('/connect/google/callback',
  passport.authorize('google', {
    successRedirect : '/forums',
    failureRedirect : '/usrlogin'
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  router.get('/unlink/local', function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/');
    });
  });

  // facebook -------------------------------
  router.get('/unlink/facebook', function(req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/');
    });
  });

  // google ---------------------------------
  router.get('/unlink/google', function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/');
    });
  });


}

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/usrlogin');
  }
}
