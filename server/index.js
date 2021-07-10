require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { PORT, MONGO_URL } = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api', require('./routes/auth-router'));

mongoose.connect(MONGO_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Connected to MongoDb');
});

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
