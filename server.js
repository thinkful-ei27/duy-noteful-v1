'use strict';

// Load array of notes
console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

//const data = require('./db/notes');

// Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

const app = express();

const logger = require('./middleware/logger');

const { PORT } = require('./config');

app.use(logger);

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());


app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err =>{
  console.error(err);
});

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});


app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  notes.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});