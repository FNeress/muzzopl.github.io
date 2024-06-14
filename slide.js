
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
