module.exports = {

    'facebookAuth' : {
        'clientID'      : '2057111791006784', // your App ID
        'clientSecret'  : 'c48619e3fc5aee3e63075fd2e3c4052d', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth' : {
        'clientID'      : '921167686999-8icl96ecvcmit8ksuksrhujrj93m1sep.apps.googleusercontent.com',
        'clientSecret'  : 'Nmdf3uPn9YnzRxtLzcJmaXdf',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
  }
