console.log('Client Script Ready:');

const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const postsDisplay = document.querySelector('.posts-display');
const errorDisplay = document.querySelector('.error');
// Needs to be your own deployment environment
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://XXXXXXXXXXX/';

loading.style.display = 'block';

setTimeout(() => {
  getAllPosts();
}, 300);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Form submition client request...');

  errorDisplay.innerHTML = '';

  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  const post = {
    name,
    content
  };
  console.log(post);

  loading.style.display = 'block';
  postsDisplay.style.display = 'none';

  // Client side insert to server - then into DB
  fetch(API_URL + '/post', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json()) // Respond to see the post that was inserted
    .then(createdPost => {
      console.log('ServerResponse: ', createdPost);
      form.reset();
      setTimeout(() => {
        getAllPosts();
        postsDisplay.style.display = 'block';
        loading.style.display = 'none';
      },300);
    })
    .catch(err => {
      const error = document.createElement('p');
      error.textContent =
        'Please wait a while! Only 1 message allowed per couple of seconds.';
      errorDisplay.appendChild(error);

      console.log('ERROR CATCH', err);
      console.log('Something went wrong... Perhaps to many post submitions?');
      form.style.display = 'block';
      loading.style.display = 'none';
    });
});

function getAllPosts() {
  postsDisplay.innerHTML = '';
  fetch(API_URL + '/posts')
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
      posts.reverse();
      posts.forEach(post => {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const created = document.createElement('p');
        created.className = 'created';
        div.className = 'post-single';

        h3.textContent = post.name; // DON'T use innerHTML to avoid cross site scripting
        p.textContent = post.content;
        created.textContent = post.created;
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(created);
        postsDisplay.appendChild(div);
      });
      loading.style.display = 'none';
    });
}
