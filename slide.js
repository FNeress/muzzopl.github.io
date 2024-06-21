
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

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];
const wrapper = document.querySelector('.wrapper');

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    e.preventDefault();
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
};

autoPlay();

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);