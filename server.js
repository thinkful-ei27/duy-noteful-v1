'use strict';

// Load array of notes
console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');

const app = express();

const logger = require('./middleware/logger');

const { PORT } = require('./config');
app.use(logger);

app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err =>{
  console.error(err);
});

app.get('/api/notes', (req, res) =>{
  const searchTerm = req.query.searchTerm;
  if (searchTerm){
    let results = data.filter(item =>item.title.includes(searchTerm));
    res.json(results);
  }
  else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res)=>{
  const id = req.params.id;
  let note = data.find(item =>item.id === Number(id));
  res.json(note);
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