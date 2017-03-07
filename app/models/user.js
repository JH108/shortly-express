var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  initialize: function(username, password) {
    this.set('username', username);
    this.set('password', bcrypt.hashSync(password));
  },

  validate: function(password) {
    bcrypt.compareSync(password, this.get('password'));
  }
});

module.exports = User;