const mongoose = require('mongoose');
// const {Schema} = mongoose;
// OR
const UserSchema = new mongoose.Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
});
//mongoose.model('mongodb collection name',schema name);
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;