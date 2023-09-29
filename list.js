const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
},
{
  collection: 'list'
}
);

module.exports = mongoose.model('List', listSchema); // Change the model name to 'User'

