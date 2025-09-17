const form = document.querySelector('.show-form form')
const track = document.querySelector('#switch');
const sortear = document.querySelector('.show-form form .draw');
const showForm = document.querySelector('.show-form');
const showResult = document.querySelector('.show-result');
const sortearNovamente = document.querySelector('.show-result .draw');

// seleciona os inputs do form
const number = document.querySelector('#number');
const minNumber = document.querySelector('#min-number');
const maxNumber = document.querySelector('#max-number');

track.addEventListener('click', () => {
    const button = document.querySelector('#switch button');
    button.classList.toggle('switch-uncheck');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    showForm.classList.add('hide');
    showResult.classList.remove('hide')
});

sortearNovamente.addEventListener('click', () => {
    showForm.classList.remove('hide');
    showResult.classList.add('hide');
    inputClear();
});

function inputClear() {
    number.value = "";
    minNumber.value = "";
    maxNumber.value = "";
    number.focus();
}
