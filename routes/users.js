var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var Team = require('../models/team');

//register route
router.get('/register', (req, res)=>{
  res.render('register');
});

// login route
router.get('/login', (req, res)=>{
  res.render('login');
});

// register route
router.post('/register', (req, res)=>{


  var team_name = req.body.team_name;
  var location = req.body.location;
  var dot = req.body.dot;
  var name_manager = req.body.name_manager;
  var num_manager = req.body.num_manager;
  var mail_manager = req.body.mail_manager;
  var password = req.body.password;
  var password2 = req.body.password2;
  var name_captain = req.body.name_captain;
  var num_captain = req.body.num_captain;
  var mail_captain = req.body.mail_captain;



  // validation
  req.checkBody('team_name', 'Team name is required').notEmpty();
  req.checkBody('location', 'location is required').notEmpty();
  req.checkBody('name_manager', 'A Manager name is required').notEmpty();
  req.checkBody('num_manager', 'Manager contact number is required').notEmpty();
  req.checkBody('mail_manager', 'Manager mail address is required').notEmpty();
  req.checkBody('mail_manager', 'Email address is invalid/ not correct').isEmail();
  req.checkBody('name_captain', 'A Captain Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors : errors
    })
  }
  else {
    Team.findOne({ 'manager.mail' : mail_manager }, function(err, team) {
      if (err) throw err;
      if (team) {
        req.flash('error_msg', 'That manager email is already registered.');
        res.redirect('/users/register');
        console.log("exist");
      }
      else {

        var newTeam = new Team();

        newTeam.team_name = team_name,
        newTeam.location = location,
        newTeam.date = dot,
        newTeam.manager.name = name_manager,
        newTeam.manager.number = num_manager,
        newTeam.manager.mail = mail_manager,
        newTeam.manager.password = password,
        newTeam.captain.name = name_captain,
        newTeam.captain.number = num_captain,
        newTeam.captain.mail = mail_captain

        Team.createTeam(newTeam, (err, user) => {
          if(err) throw err;
          console.log(user);
        });

        req.flash('success_msg', 'you Team has been successfully registered');
        res.redirect('/users/login');
      }
    });
  };
});


passport.use(new LocalStrategy(
  (mail, password, done)=>{
    Team.getTeamBymanMail(mail, (err, team)=>{
      if(err) throw err;
      if(!team){
        return done(null, false, {message: 'Unknown Manager mail id'});
      }
      Team.comparePassword(password, team.manager.password, (err, isMatch)=>{
        if(err) throw err;
        if(isMatch){
          return done(null, team);
        }
        else{
          return done(null, false, {message: 'Invalid Password'});
        }
      })
    })
  }
));

passport.serializeUser((team, done)=>{
  done(null, team.id);
});

passport.deserializeUser((id, done)=>{
  Team.getTeamById(id, (err, team)=>{
    done(err, team);
  });
});

router.post('/login',
passport.authenticate('local', {successRedirect: '/matches/fix', failureRedirect: '/users/login', failureFlash: true}),
(req, res)=>{
  res.redirect('/users/login');
});


router.get('/logout', (req, res)=>{
  req.logout();
  req.flash('success_msg', 'Logged out');

  res.redirect('/users/login');
});

module.exports = router;
