console.log('Client Script Ready:');

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    console.log('Form Submitted')
})
