'use strict'

function BinarioADecimal(num) {

let miArray = Array.from (String(num),Number);
let arrayInvert = miArray.reverse();
let arrayResult = [];
let resultado = 0;

for (var i= 0; i< arrayInvert.length; i++){
  arrayResult.push (arrayInvert[i] * Math.pow(2,i));
}

for (var i= 0; i< arrayResult.length; i++){
  resultado =+ arrayResult[i];
}
return resultado;


var creaFuncion = function(){
  var arreglo = [];

  for ( var i=0; i < 3; i++){
    arreglo.push(
      function(){
        console.log(i);
      }
    )
  }
  return arreglo;
}

var arr = creaFuncion();

arr[0]() // 3 sale un 3, qué esperaban ustedes??
arr[1]() // 3
arr[2]() // 3







}

function DecimalABinario(num) {
 
  let arrayBinario = [];

while (num > 1){
  arrayBinario.unshift(num % 2);
  num = Math.floor(num / 2);
}

if (num === 1) arrayBinario.unshift(1);
var resultado =+ arrayBinario.join("");
return resultado.toString();

}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}