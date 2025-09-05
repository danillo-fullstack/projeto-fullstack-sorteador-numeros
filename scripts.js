const track = document.querySelector('#switch');
const sortear = document.querySelector('.show-form form .draw');
const showForm = document.querySelector('.show-form');
const showResult = document.querySelector('.show-result');
const sortearNovamente = document.querySelector('.show-result .draw');

track.addEventListener('click', () => {
    const button = document.querySelector('#switch button');
    button.classList.toggle('switch-uncheck');
});

sortear.addEventListener('click', () => {
    showForm.classList.add('hide');
    showResult.classList.remove('hide')
});

sortearNovamente.addEventListener('click', () => {
    showForm.classList.remove('hide');
    showResult.classList.add('hide');
})
