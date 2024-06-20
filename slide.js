
var radio = document.querySelector('.manual-btn')
var cont= 1

document.getElementById('radio1').checked = true

setInterval(() => {
    proximaImg()
}, 6000)


function proximaImg(){
    cont++

    if( cont>3){
        cont=1
    }
    document.getElementById('radio'+cont).checked = true
}
// Adiciona funcionalidade às setas
document.querySelector('.left-arrow').addEventListener('click', () => {
    cont--;
    if (cont < 1) {
        cont = 3;
    }
    document.getElementById('radio' + cont).checked = true;
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    cont++;
    if (cont > 3) {
        cont = 1;
    }
    document.getElementById('radio' + cont).checked = true;
});

window.addEventListener('scroll', function() {
    var elementos = document.querySelectorAll('.texto-animado');
    
    elementos.forEach(function(elemento) {
        var posicaoElemento = elemento.getBoundingClientRect().top;
        var posicaoTela = window.innerHeight;

        if (posicaoElemento < posicaoTela) {
            elemento.classList.add('aparecendo');
        } else {
            elemento.classList.remove('aparecendo');
        }
    });
});''

const track = document.querySelector('.carousel-track');
const setaEsquerda = document.querySelector('.seta-esquerda');
const setaDireita = document.querySelector('.seta-direita');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].getBoundingClientRect().width + 10; // 10px for margin-right
let currentIndex = 0;

function updateTrackPosition() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

setaEsquerda.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 3; // Vai para o último conjunto de 3 itens
    }
    updateTrackPosition();
    resetAutoSlide();
});

setaDireita.addEventListener('click', () => {
    if (currentIndex < items.length - 3) {
        currentIndex++;
    } else {
        currentIndex = 0; // Volta para o início
    }
    updateTrackPosition();
    resetAutoSlide();
});

function autoSlide() {
    if (currentIndex < items.length - 3) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateTrackPosition();
}

let autoSlideInterval = setInterval(autoSlide, 3000);

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 3000);
}
