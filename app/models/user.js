var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  initialize: function(attributes) {
    // console.log(this);
    // console.log('INPUT', attributes);
    // this.set('username', attributes.username);
    // this.set('password', bcrypt.hashSync(attributes.password));

    this.on('creating', this.hashPassword);
  },

  hashPassword: function() {
    this.set('password', bcrypt.hashSync(this.get('password')));
  },

  validate: function(password) {
    return bcrypt.compareSync(password, this.get('password'));
  }
});

module.exports = User;