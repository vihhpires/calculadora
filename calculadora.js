
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); 
const operadores = document.querySelectorAll('[id*=operador]');

let novoNum = true;
let operador;
let numAnterior;

const opercaoPendente = () => operador != undefined;

const calcular = () => {
    if (opercaoPendente()) {
        const numAtual = parseFloat(display.textContent.replace(',','.'));
        novoNum = true;
        const resultado = eval (`${numAnterior}${operador}${numAtual}`);
        autalizarDisplay(resultado);
    }
}

const autalizarDisplay = (texto) => {
    if (novoNum){
        display.textContent = texto.toLocaleString('BR');
        novoNum = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => autalizarDisplay(evento.target.textContent);

const selecionarOperador = (evento) => {
    if (!novoNum){
        calcular();
        novoNum = true;
        operador = evento.target.textContent;
        numAnterior = parseFloat(display.textContent.replace(',','.'));
        console.log(operador);
    }
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarigual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarigual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNum = true;
    numAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNum = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNum);

const invertervalor = () => {
    novoNum = true;
    autalizarDisplay (display.textContent * -1);
} 
document.getElementById('inverter').addEventListener('click', invertervalor);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            autalizarDisplay(',');
        } else {
            autalizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0'          : 'tecla0',
    '1'          : 'tecla1',
    '2'          : 'tecla2',
    '3'          : 'tecla3',
    '4'          : 'tecla4',
    '5'          : 'tecla5',
    '6'          : 'tecla6',
    '7'          : 'tecla7',
    '8'          : 'tecla8',
    '9'          : 'tecla9',
    '/'          : 'operadorDiv',
    '*'          : 'operadorMulti',
    '-'          : 'operadorSUb',
    '+'          : 'operadorAdi',
    '='          : 'igual',
    'Enter'      : 'igual',
    'Backspace'  : 'backspace',
    'c'          : 'limparDisplay',
    'Escape'     : 'limparCalculo',
    ','          : 'decimal',


}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    console.log(tecla);

    const teclaPermetida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;   
    if (teclaPermetida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);