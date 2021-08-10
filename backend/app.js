const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const providerRoutes = require('./routes/provider');

const app = express();

console.log('conneted successfully');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})

app.use('/api/provider', providerRoutes);

module.exports = app;
