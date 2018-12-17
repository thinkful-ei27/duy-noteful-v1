'use strict';

// Load array of notes
console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');

const app = express();

app.listen(8080, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err =>{
  console.error(err);
});

app.get('/api/notes', (req, res) =>{
    const searchTerm = req.query.searchTerm;
    if (searchTerm){
    const results = data.filter(item =>item.title.includes(searchTerm));
    res.json(results);
    else {
        res.json(data);
    }
}
});

app.get('/api/notes/:id', (req, res)=>{
    const id = req.params.id;
    const note = data.find(item =>item.id === Number(id));
  res.json(note);
});