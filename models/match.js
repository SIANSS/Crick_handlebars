var mongoose = require('mongoose');

var MatchSchema = mongoose.Schema({
  status_fixed      : {type:Boolean,required:true},
  location          : {type:String,required:true},
  date              : {type:String, required:true},
  time              : {type:String, required:true},
  teams             : {
          home        : {type:String,required:true},
          away        : {type:String,required:true}
  },
  match             : {
          overs       : {type:String,required:false},
          player_per_team : {type:Number,required:false},
          bowlers     : {type:Number, required:false}
  },
  misc              : {
          fixdate     : {type:String, required:false},
          fixtime     : {type:String, required:false}
  }
});


var Match = module.exports = mongoose.model('Match', MatchSchema);

module.exports.createMatch = (newMatch, callback) => {
  newMatch.save(callback);
}
