'use strict';

const express = require('express');
const cors = require('cors'); // Handle CORS related issues
const monk = require('monk'); // DB
const Filter = require('bad-words'); // Profanity Filter
const rateLimit = require('express-rate-limit'); // Limits Server requests

// Activates Express
const app = express();

// Connects to MongoDB
const db = monk( process.env.MONGO_URI || 'localhost/messenger18'); 

// Creates Collection Array "Posts". (If not allready exist, it creates it)
const posts = db.get('posts');

// Filters out bad words with clean()
const filter = new Filter();

// Cors Response handle activate
app.use(cors());

// Parses client side responds into json
app.use(express.json()); 

app.get('/', (req, res) => {
  // Server respond
  res.json({
    message: 'Server Running! Nice.'
  });
});

app.get('/posts', (req, res) => {
  posts.find().then(posts => {
    res.json(posts);
  });
});

function isPostValid(post) {
  //   SHORT-HAND expression:
  //   return post.name && post.name.toString().trim() !== '' &&
  //   post.content && post.content.toString().trim() !== '';

  if (!post.name || post.name.toString().trim() == '') {
    return false;
  } else if (!post.content || post.content.toString().trim() == '') {
    return false;
  } else {
    return true;
  }
}

// Rate limits server requests.
// By moving app.use BELOW GETERS it limits posts only
const limiters = rateLimit({
  windowMs: 15 * 1000, // 30 seconds
  max: 1, // limit each IP to 1 requests per windowMs
  message: 'To many post request has been made from your IP! Please wait a few second...'
});
app.use(limiters);

app.post('/post', (req, res) => {
  // Incoming posts from client
  if (isPostValid(req.body)) {
    const post = {
      name: filter.clean(req.body.name.toString()), // toString prevents DATA INJECTION
      content: filter.clean(req.body.content.toString()),
      created: new Date()
    };
    console.log('Valid post!', post);

    // Insert into DB collection "posts"
    posts.insert(post).then(createdPost => {
      res.json(createdPost);
      console.log('Post entered into DB', createdPost);
    });
  } else {
    res.status(422);
    res.json({
      message: 'Missing required fields!'
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on http://localhost:5000');
});
