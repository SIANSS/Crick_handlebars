var mongoose = require('mongoose');
var bcrypt  = require('bcryptjs');


var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index:true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name:{
    type: String
  }
});


var user = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}
