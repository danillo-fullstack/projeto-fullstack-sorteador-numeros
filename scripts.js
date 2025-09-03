const track = document.querySelector('#switch');
console.log(track);

track.addEventListener('click', () => {
    const button = document.querySelector('#switch button');
    button.classList.toggle('switch-uncheck');
})