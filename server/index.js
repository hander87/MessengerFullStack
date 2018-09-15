const express = require('express');
const cors = require('cors'); // Handle CORS related issues
const monk = require('monk'); // DB

const app = express(); 

const monk = monk('localhost/messenger18'); // Connects to DB

app.use(cors());
app.use(express.json()); // Parses client side responds into json

app.get('/', (req, res) => {
  // Server respond
  res.json({
    message: 'Hello from Express'
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

app.post('/post', (req, res) => {
  // Incoming posts from client
  if (isPostValid(req.body)) {
    const post = {
      name: req.body.name.toString(), // toString prevents DATA INJECTION
      content: req.body.content.toString()
    };
    console.log('Valid post!', post);
  } else {
    res.status(422);
    res.json({
      message: 'Missing required fields!'
    });
  }
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});
