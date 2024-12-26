require('dotenv').config();
require('./app/utils/config');
require('./app/utils/contants');
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use((req, res, next) => {
 const origin = req.headers.origin || 'default';
//  console.log("origin", origin)
 if (!req.headers.origin || allowedOrigins.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
 }
 res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 next();
});
const routes = require('./app/routes');
app.use('/', routes);
const { mongoConnect } = require('./app/utils/db');
// Connect to the database
mongoConnect(() => {
 console.log('Database connected successfully.');
 //listen
 app.listen(PORT, () => {
  console.log('http:/localhost:' + PORT)
 })
});
