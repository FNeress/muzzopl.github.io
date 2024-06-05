
var radio = document.querySelector('.manual-btn')
var cont= 1

document.getElementById('radio1').checked = true

setInterval(() => {
    proximaImg()
}, 9000)


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
