var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:Sicar1996@ds119750.mlab.com:19750/crick_at');

var ObjectID = require('mongodb').ObjectID;
var db = mongoose.connection;
var express = require('express');
var router = express.Router();
var Match = require('../models/match');


router.get('/getlatestmatches', (req, res)=>{
  var status = false;
  Match.find({}).toArray((err, result)=>{
    if (err) throw err;
    if(!result){
      res.send(status);
    }
    else {
      res.send(result);
    }
  })
})

router.get('/fix', ensureAuthenticated, (req, res)=>{
  res.render('fix', {team : req.user});
})

router.get('/getallteam', ensureAuthenticated, (req, res)=> {
  db.collection('teams').find({}).toArray((err, result) => {
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

router.post('/fix', ensureAuthenticated, (req, res) => {

  var newMatch = new Match();
  newMatch.status_fixed = false;
  newMatch.location = req.body.location;
  newMatch.date = req.body.date;
  newMatch.time = req.body.time;
  newMatch.teams.home = req.body.home;
  newMatch.teams.away = req.body.away;
  newMatch.match.overs = req.body.overs;
  newMatch.match.player_per_team = req.body.ppt;


  Match.createMatch(newMatch, (err, match)=> {
    if(err) throw err;
    console.log(match);
  })

  req.flash('success_msg', 'match request sent');
  res.redirect('/');
});

router.get('/test', (req, res)=>{
  res.render('test');
})

router.get('/dashboard', ensureAuthenticated, (req, res)=> {
  res.render('ppage', {team : req.user});
});

router.get('/getmatches/:team', ensureAuthenticated, (req, res)=>{

  var team_name = req.params.team;
  console.log(team_name);

  db.collection('matches').find({'teams.home' : team_name}).toArray((err, ress) => {
    if(err) throw err;
    if(ress) {
      var sendback = ress;
      res.send(sendback);
      console.log(sendback);
    }
    else {
      var sendback = false;
      res.send(sendback);
      console.log("No result");
    }
  })

});

router.get('/getmatchesv2/:team', ensureAuthenticated, (req, res)=>{

  var team_name = req.params.team;
  console.log(team_name);

  db.collection('matches').find({'teams.away' : team_name}).toArray((err, result) => {
    if(err) throw err;
    if(result.length !== 0) {
      res.send(result);
      console.log(result);
    }
    if(result.length === 0 || result.length == 0) {
      var statux = false;
      res.send(statux);
      console.log("No result");
    }
  })

});


router.put('/confirmmatch/:id', ensureAuthenticated, (req, res)=>{

  var id = req.params.id;
  var date = req.body.date;
  var location = req.body.location;
  var time = req.body.time;
  var home = req.body.home;
  var away = req.body.away;


  const clog = { '_id': new ObjectID(id) };
  console.log("this +" + id);

  const changes = { 'status_fixed' : true, 'location' : location, 'date' : date, 'time' : time, 'teams.home' : home, 'teams.away' : away};
  Match.update(clog, changes, (err, result) => {
    if (err) {
      throw err;
      // res.send({'error':'An error has occurred'});
    } else {
      res.send(result);
    }
  });
});

module.exports = router;

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}
