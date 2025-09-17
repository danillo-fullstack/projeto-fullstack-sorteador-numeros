const form = document.querySelector('.show-form form')
const track = document.querySelector('#switch');
const sortear = document.querySelector('.show-form form .draw');
const showForm = document.querySelector('.show-form');
const showResult = document.querySelector('.show-result');
const viewResult = document.querySelector('.show-result ul');
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
    
    if (validatedNumber()) {
        alert('O número mínimo maior que o número máximo.')
        inputClear();
        return;
    } 
    showForm.classList.add('hide');
    showResult.classList.remove('hide');
    prizeNumber();

});

[number, minNumber, maxNumber].forEach(input => {
    input.addEventListener('input', ()=> {
        input.value = input.value.replace(/[^0-9]/g, '');
    });
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

function prizeNumber() {
    for (let index = 1; index <= number.value; index++) {
        const li = document.createElement('li');
        li.textContent = index;
        viewResult.append(li);
    }
}

function validatedNumber() {
    if (Number(minNumber.value) > Number(maxNumber.value)) {
        return true;
    }
}

