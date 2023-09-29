const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
},
{
  versionKey: false
}
);

module.exports = mongoose.model('User', userSchema); // Change the model name to 'User'

