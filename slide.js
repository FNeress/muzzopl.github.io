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

const initialText = "ORGANIZE";
const acrosticText = [
    "timizamos",
    "eportamos",
    "erenciamos",
    "gilizamos",
    "orteamos",
    "os dedicamos",
    "novamos",
    "elamos",
    "struturamos"
];

let currentInitialIndex = 0;
let currentTextIndex = 0;
let currentCharIndex = 0;

const initialContainer = document.getElementById('initial-container');
const initialLines = initialContainer.querySelectorAll('div');
const lines = document.querySelectorAll('#acrostic-container > div');
let cursorElement;

function typeInitial() {
    if (currentInitialIndex < initialText.length) {
        const line = initialLines[currentInitialIndex];
        
        if (!cursorElement) {
            cursorElement = document.createElement('span');
            cursorElement.classList.add('cursor');
            cursorElement.textContent = '_';
        }

        if (!line.contains(cursorElement)) {
            line.appendChild(cursorElement);
        }

        line.insertBefore(document.createTextNode(initialText[currentInitialIndex]), cursorElement);
        currentInitialIndex++;
        setTimeout(typeInitial, 400); // Adjust typing speed here
    } else {
        if (cursorElement.parentNode) {
            cursorElement.parentNode.removeChild(cursorElement);
        }
        initialContainer.style.display = 'none';
        document.getElementById('acrostic-container').style.display = 'flex';
        setTimeout(typeCharacter, 1000); // Wait before starting the acrostic typing
    }
}

function typeCharacter() {
    if (currentTextIndex < acrosticText.length) {
        const line = lines[currentTextIndex].querySelector('.content');
        
        if (currentCharIndex === 0) {
            cursorElement = document.createElement('span');
            cursorElement.classList.add('cursor');
            cursorElement.textContent = '_';
            line.appendChild(cursorElement);
        }

        if (currentCharIndex < acrosticText[currentTextIndex].length) {
            line.insertBefore(document.createTextNode(acrosticText[currentTextIndex][currentCharIndex]), cursorElement);
            currentCharIndex++;
            setTimeout(typeCharacter, 45); // Adjust typing speed here
        } else {
            line.removeChild(cursorElement);
            currentCharIndex = 0;
            currentTextIndex++;
            setTimeout(typeCharacter, 1500); // Wait before starting the next word
        }
    } else {
        setTimeout(deleteCharacter, 3000); // Wait before starting the deletion
    }
}

function deleteCharacter() {
    if (currentTextIndex > 0) {
        currentTextIndex--;
        const line = lines[currentTextIndex].querySelector('.content');
        currentCharIndex = acrosticText[currentTextIndex].length;
        cursorElement = document.createElement('span');
        cursorElement.classList.add('cursor');
        cursorElement.textContent = '_';
        line.appendChild(cursorElement);

        function deleteChar() {
            if (currentCharIndex > 0) {
                line.removeChild(line.childNodes[currentCharIndex - 1]);
                currentCharIndex--;
                setTimeout(deleteChar, 45); // Adjust deletion speed here
            } else {
                line.removeChild(cursorElement);
                setTimeout(deleteCharacter, 400); // Wait before starting the next deletion
            }
        }

        deleteChar();
    } else {
        setTimeout(typeInitial, 1000); // Restart the initial typing animation
    }
}

typeInitial();