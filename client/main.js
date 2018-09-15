console.log('Client Script Ready:');

const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const postsDisplay = document.querySelector('.posts-display');
const API_URL = 'http://localhost:5000';

loading.style.display = 'block';

getAllPosts();

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    console.log('Form Submitted');

    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const post = {
        name,
        content
    }
    console.log(post);

    form.style.display = 'none';
    loading.style.display = 'block';

    // Client side insert to server - then into DB
    fetch(API_URL + '/post', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json()) // Respond to see the post that was inserted
    .then(createdPPost => {
        console.log('ServerResponse: ', createdPPost);
        form.reset();
        getAllPosts();
        form.style.display = 'block';
        loading.style.display = 'none';
    })
    .catch(err => {
        console.log('Something went wrong... Perhaps you sent to many request.');
        form.style.display = 'block';
        loading.style.display = 'none';
    })
    
})

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
        })
}
