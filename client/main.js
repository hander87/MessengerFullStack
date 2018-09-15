console.log('Client Script Ready:');

const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000';

loading.style.display = 'none';

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
        form.style.display = 'block';
        loading.style.display = 'none';
    })
    
})
