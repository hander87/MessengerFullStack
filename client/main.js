console.log('Client Script Ready:');

const form = document.querySelector('form');
const loading = document.querySelector('.loading');

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
})
