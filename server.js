'use strict';

/*
//basic dependencies
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
app.get('/', new_search);

app.post('/searches', create_search);

//catches bad routes
app.get('*', (request, response) => response.status(404).send('womp womp bad route'));

app.listen(PORT, () => console.log(`Book app listening on port ${3000}`));

//helper functions
function Book(info) {
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

*/
//=================

// Application Dependencies
const express = require('express');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');


// API Routes
// Renders the search form
app.get('/', newSearch);

// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS
// Only show part of this to get students started
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'No Title Available';

}

// Note that .ejs file extension is not required
function newSearch(request, response) {
  response.render('pages/index');
}

// No API key required
// Console.log request.body and request.body.search
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }

  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  console.log(url);

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchResults: results }));
  // how will we handle errors?
}


