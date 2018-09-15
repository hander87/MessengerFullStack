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

    // Client side insert to server - then into DB
    fetch(API_URL + '/post', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(createdPPost => {
        console.log('ServerResponse: ', createdPPost)
    })

    form.style.display = 'none';
    loading.style.display = 'block';
})
