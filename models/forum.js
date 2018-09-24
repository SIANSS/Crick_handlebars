var mongoose = require('mongoose');

var ForumSchema = mongoose.Schema({
  post_by           : {type:String,required:true},
  date              : {type:String, required:true},
  time              : {type:String, required:true},
  post_body         : {
          title         : {type:String,required:true},
          body          : {type:String,required:true}
  },
  imgs              : {type:String, required:true}
});


var Forum = module.exports = mongoose.model('Forum', ForumSchema);

module.exports.createForum = (newForum, callback) => {
  newForum.save(callback);
}
