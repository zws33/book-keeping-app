const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: { 
    type: String,
    required: true 
  },
  password: {
    type: String,
    require: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(testPassword, hash, callback){
  bcrypt.compare(testPassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};