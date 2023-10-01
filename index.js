const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./users');
const List = require('./list');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
mongoose.connect('mongodb+srv://palashghosh43442:ZFBHMQcNLrbc58jh@cluster0.7n22rqm.mongodb.net/tutorial?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);

var ObjectId = require('mongoose').Types.ObjectId;
// List.find({}).then((list)=>{
//   console.log('list is ', list);
// }).catch((err)=>{
//   console.error(err);
// })

app.get('/users', (req, res)=>{
  User.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
app.post('/user', jsonParser, (req, res)=>{
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email
  })
  if(req.body.name && req.body.email){
    data.save().then((result)=>{
      res.status(201).json(result);
    })
  }
  else{
    res.status(400).send('unexpected error occured');
  }
})

// app.delete('/user/delete', jsonParser,(req, res)=>{
//   User.deleteOne({_id: req.body.id}).then((result)=>{
//     res.status(200).json(result);
//   }).catch((err)=>{
//     console.warn(err);
//   })
// })
app.delete('/user/delete', jsonParser, (req, res) => {
  User.deleteOne({ _id: req.body.id })
    .then((result) => {
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

  const data =  new User({
    _id: mongoose.Schema.Types.ObjectId,
    name: 'tony',
    email: 'stark@gmail.com'
  })
  async function createUser() {
    try {
      const newUser = new User({
        _id: new ObjectId(),
        name: 'Palash Ghosh',
        email: 'pgtest23@gmail.com'
      });

      await newUser.save();
      console.log('User saved successfully');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  // createUser();
  app.listen(5000);
