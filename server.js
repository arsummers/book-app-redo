'use strict';

//basic dependencies
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

//setting up thr app
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//prep for server side templating
app.set('view engine', 'ejs');

//routes
//renders page with search form
app.get('/', newSearch);

app.post('/searches', createSearch);

//catches bad routes
app.get('*', (request, response) => response.status(404).send('womp womp bad route'));

app.listen(PORT, () => console.log(`Book app listening on port ${3000}`));

//helper functions
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title;
}

function newSearch(request, response){
  response.render('pages/index');
}

function createSearch(request, response){
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }

  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  console.log(url);

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(book_result => new Book(book_result.volumeInfo)))
    .then(results => response.render('pages/searches/show', { search_results : results}));
}
