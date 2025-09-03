const track = document.querySelector('#switch');

track.addEventListener('click', () => {
    const button = document.querySelector('#switch button');
    button.classList.toggle('switch-uncheck');
})