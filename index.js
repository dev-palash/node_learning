const express = require('express');
const app = express();
const bodyPareser = require('body-parser');
app.use(bodyPareser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://palashghosh43442:ZFBHMQcNLrbc58jh@cluster0.7n22rqm.mongodb.net/tutorial?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const User = require('./users');

app.get('/users', (req, res)=>{
User.find().then((users)=>{
  res.status(200).json(users);
}).catch((err)=>{
  res.status(404).send('some error occured');
})
});

app.post('/users/user', (req, res)=>{
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email
  });
  data.save().then((result)=>{
    res.status(201).json(result);
  }).catch((err)=>{
    res.status(500).send('Internal server error');
  })
});

app.delete('/users/delete', (req, res)=>{
  User.deleteOne({ _id: req.body.id }).then((result)=>{
              res.status(200).json({ message: 'User deleted successfully' });

  }).catch((err)=>{
    res.status(400).send('some error occuring');
  })
});

// app.delete('/users/delete', (req, res)=>{
//   User.deleteOne({ _id: req.body.id })
//   .then((result)=>{
//     res.status(200).json({ succedd: "User deleted successfully" });
//   })
// })

// app.delete('/users/delete', (req, res) => {
//   User.deleteOne({ _id: req.body.id })
//     .then((result) => {
//       if (result.deletedCount === 1) {
//         res.status(200).json({ message: 'User deleted successfully' });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

app.put('/user/update',(req, res)=>{
  User.updateOne({_id: req.body.id},
    {$set: {
      name: req.body.name,
      email: req.body.email
    }}
    ).then((result)=>{
      res.status(200).json(result);
    })
});

app.listen(5000);
