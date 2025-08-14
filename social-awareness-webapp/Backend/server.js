const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loginRoute = require('./login');
const registerRoute = require('./register');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', loginRoute);
app.use('/register', registerRoute);

mongoose.connect('mongodb://localhost:27017/social-awareness', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});