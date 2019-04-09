'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express;
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', new_search);

app.post('/searches', create_search);

app.get('*', (request, response) => response.status(404).send('womp womp bad route'));

app.listen(PORT, () => console.log(`Book app listening on port ${3000}`));

function Book (info) {
  this.title = info.title;
}

function new_search(request, response){
  response.render('pages/index');
}

function create_search(request, response){
  let url='https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }

  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  console.log(url);

  superagent.get(url)
    .then(api_response = api_response.body.items.map(book_result => new Book(book_result.volume_info)))
    .then(results => response.render('pages/searches/show', { search_results : results}));
}










