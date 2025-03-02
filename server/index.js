const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const SampleDb = require('./sample-db');

const productRoutes = require('./routes/products');
const path = require('path');

mongoose.connect(config.DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  if (process.env.NODE_ENV !== 'production') {
    const sampleDb = new SampleDb();
    // sampleDb.initDb();
  }
});

const app = express();

app.use('/api/v1/products', productRoutes);

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


