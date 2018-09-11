var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var TeamSchema = mongoose.Schema({
  team_name   : {type:String,required:false},
  location    : {type:String,required:false},
  date        : {type:String, required:false},
  manager     : {
    name        : {type:String,required:false},
    number      : {type:String,required:false},
    mail        : {type:String,required:false,index:true},
    password    : {type:String,required:false}
  },
  captain     : {
    name        : {type:String,required:false},
    number      : {type:String,required:false},
    mail        : {type:String,required:false}
  },
  players     : {
    total       : {type:Number,required:false},
    player_01   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_02   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_03   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_04   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_05   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_06   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_07   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_08   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_09   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_10   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    }
  },
  stats         : {
    strikeRate    : {type:String, required:false},
    wins          : {type:String, require:false}
  }
});


var Team = module.exports = mongoose.model('Team', TeamSchema);

module.exports.createTeam = (newTeam, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newTeam.manager.password, salt, (err, hash)=>{
      newTeam.manager.password = hash;
      newTeam.save(callback);
    })
  })
}


module.exports.getTeamBymanMail = (mail, callback)=>{
  var query = { 'manager.mail' : mail};
  Team.findOne(query, callback);
}

module.exports.getTeamById = (id, callback)=>{
  Team.findById(id, callback);
}


module.exports.comparePassword = (candidatePassword, hash, callback)=>{
  bcrypt.compare(candidatePassword , hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch);
  });
}
