const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const SampleDb = require('./sample-db');

const path = require('path');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

mongoose.connect(config.DB_URI, { 
  // Version 4.0.0以降は以下のオプションは不要
  // useNewUrlParser: true, 
  // useUnifiedTopology: true,
}).then(() => {
  if (process.env.NODE_ENV !== 'production') {
    const sampleDb = new SampleDb();
    // sampleDb.initDb();
  }
});

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'reservation-app', 'browser');
  app.use(express.static(appPath));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log('I am running');
});


