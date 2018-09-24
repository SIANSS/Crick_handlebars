var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var viewerSchema = mongoose.Schema({

    local            : {
        name         : String,
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    github           : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    }

});

viewerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

viewerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('viewer', viewerSchema);
