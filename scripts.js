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

// Track que permite ou não repetição de numero
const button = document.querySelector('#switch button');

track.addEventListener('click', () => {
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
    viewResult.innerHTML = '';

    const total = Number(number.value);
    const min = Number(minNumber.value);
    const max = Number(maxNumber.value);

    const permitirRepeticao = button.classList.contains('switch-uncheck');

    if (permitirRepeticao) {
        for (let index = 1; index <= total; index++) {
            const li = document.createElement('li');
            li.textContent = sortearNumero(min, max);
            viewResult.append(li);
        }
    } else {
        const numerosDisponiveis = [];
        for(let i = min; i <= max; i++) {
            numerosDisponiveis.push(i);
        }

        for(let i = 1; i <= total; i++) {
            if (numerosDisponiveis.length === 0) {
                break;
            }

            const index = Math.floor(Math.random() * numerosDisponiveis.length);
            const li = document.createElement('li');
            li.textContent = numerosDisponiveis[index];
            viewResult.append(li);

            numerosDisponiveis.splice(index, 1);
        }
    }
}

function validatedNumber() {
    if (Number(minNumber.value) > Number(maxNumber.value)) {
        return true;
    }
}

function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
