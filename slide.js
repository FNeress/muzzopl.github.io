
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

document.addEventListener('DOMContentLoaded', function() {
    const logos = document.querySelectorAll('.logo');

    logos.forEach(logo => {
        logo.addEventListener('click', function() {
            const nome = this.getAttribute('data-nome');
            const descricao = this.getAttribute('data-descricao');
            const logoSrc = this.src;
            exibirPopup(nome, descricao, logoSrc);
        });
    });

    function exibirPopup(nome, descricao, logoSrc) {
        const popupContainer = document.getElementById('popup-container');
        const backdrop = document.createElement('div');
        backdrop.classList.add('backdrop');
        popupContainer.appendChild(backdrop);

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popt">
                <img src="${logoSrc}" class="popimg" alt="Logo clicado">
                </div>
                <p>${descricao}</p>
                <button id="fecharPopupButton" class="fa">&#xf00d;</button>
            
        `;
        popupContainer.appendChild(popup);

        setTimeout(function() {
            backdrop.classList.add('show');
            popup.classList.add('show');
        }, 10);

        backdrop.addEventListener('click', fecharPopup);
        const fecharPopupButton = document.getElementById('fecharPopupButton');
        fecharPopupButton.addEventListener('click', fecharPopup);
    }

    function fecharPopup() {
        const popupContainer = document.getElementById('popup-container');
        const backdrop = document.querySelector('.backdrop');
        const popup = document.querySelector('.popup');
        popupContainer.removeChild(backdrop);
        popupContainer.removeChild(popup);
    }
});
