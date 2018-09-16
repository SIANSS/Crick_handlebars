var mongoose = require('mongoose');


var GroundSchema = mongoose.Schema({
  ground_name     : {type:String, required: false},
  location        : {type:String, required: true},
  stats           : {
      number_of_match_played :  {type:String, required:false}
  },
  misc            : {
      coordinates           :   {type:String, required:false},
      teams_near            :   {type:String, required:false},
      contacts              :   {type:String, required:false}
  }
})

var Ground = module.exports = mongoose.model('Ground', GroundSchema);

module.exports.createGround = (newGround, callback) => {
  newGround.save(callback);
}
