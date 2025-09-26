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

    // Esconde o botão sortear novamente
    sortearNovamente.style.display = 'none';

    const total = Number(number.value);
    const min = Number(minNumber.value);
    const max = Number(maxNumber.value);

    const permitirRepeticao = button.classList.contains('switch-uncheck');
    let numerosSorteados = [];

    if (permitirRepeticao) {
        for (let index = 1; index <= total; index++) {
            numerosSorteados.push(sortearNumero(min, max));
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
            numerosSorteados.push(numerosDisponiveis[index]);
            numerosDisponiveis.splice(index, 1);
        }
    }

    // Passa uma função callback para mostrar o botão ao final
    animarNumeros(numerosSorteados, viewResult, 2000, () => {
        sortearNovamente.style.display = '';
    });
}

// Função para animar a exibição dos números sorteados
function animarNumeros(numeros, container, delay = 2000, onComplete) {
    container.innerHTML = '';
    const formElement = form;
    const animacaoContainer = document.createElement('div');
    animacaoContainer.style.position = 'absolute';
    animacaoContainer.style.left = '0';
    animacaoContainer.style.top = '0';
    animacaoContainer.style.width = '100%';
    animacaoContainer.style.height = '100%';
    animacaoContainer.style.display = 'flex';
    animacaoContainer.style.justifyContent = 'center';
    animacaoContainer.style.alignItems = 'center';
    animacaoContainer.style.pointerEvents = 'none';
    animacaoContainer.style.zIndex = '9999';
    formElement.style.position = 'relative';
    formElement.appendChild(animacaoContainer);

    function animar(i) {
        if (i >= numeros.length) {
            animacaoContainer.remove();
            if (typeof onComplete === 'function') onComplete();
            return;
        }

        const animado = document.createElement('div');
        animado.textContent = numeros[i];
        animado.style.font = '700 5rem/150% "Roboto mono", sans-serif';
        animado.style.color = 'var(--content-brand)';
        animado.style.background = 'var(--background-primary, #fff)';
        animado.style.borderRadius = '16px';
        animado.style.boxShadow = '0 4px 32px rgba(0,0,0,0.12)';
        animado.style.padding = '2rem 3rem';
        animado.style.transition = 'all 0.8s cubic-bezier(.68,-0.55,.27,1.55)';
        animado.style.opacity = '1';
        animado.style.transform = 'scale(1)';
        animado.style.position = 'relative';

        animacaoContainer.appendChild(animado);

        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = numeros[i];
            li.style.visibility = 'hidden';
            container.appendChild(li);

            const liRect = li.getBoundingClientRect();
            const animRect = animado.getBoundingClientRect();

            const deltaX = liRect.left + liRect.width / 2 - (animRect.left + animRect.width / 2);
            const deltaY = liRect.top + liRect.height / 2 - (animRect.top + animRect.height / 2);

            animado.style.transition = 'all 0.8s cubic-bezier(.68,-0.55,.27,1.55)';
            animado.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.7)`;
            animado.style.opacity = '0.7';

            setTimeout(() => {
                animado.remove();
                li.style.visibility = 'visible';
                animar(i + 1);
            }, 1500);
        }, delay - 2000);
    }

    animar(0);
}
function validatedNumber() {
    if (Number(minNumber.value) > Number(maxNumber.value)) {
        return true;
    }
}

function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
