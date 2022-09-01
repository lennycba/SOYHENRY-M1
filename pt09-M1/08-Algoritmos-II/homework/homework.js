'use strict'
// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  if (array.length <= 1) {
    return array;
  }

  var pivote = array[Math.floor(Math.random() * array.length)];
  
  let left = []; 
  let right = [];
  let igual = [];
  for (var i = 0; i < array.length; i++) {
    if(array[i] < pivote){
      left.push(array[i])
    }else if(array[i] > pivote){
      right.push(array [i])
    }else{
      igual.push(array[i])
    }
  }

  return quickSort(left).concat(igual).concat(quickSort(right));
};
//-----------------------------------------------------------------
let split = function(array){
let mitad = Math.floor(array.length / 2);
let izq = array.slice(0, mitad);
let der = array.slice(mitad);

return [izq, der];
};

let unir = function(izq, der){
  let izqIndex = 0;
  let derIndex = 0;
  let unidos = [];

    while(izqIndex < izq.length && derIndex < der.length){
      if (izq[izqIndex] < der[derIndex]){
        unidos.push(izq[izqIndex]);
        izqIndex ++
      }else{
        unidos.push(der[derIndex]);
        derIndex ++;
      }
    }
    return unidos.concat(izq.slice(izqIndex)).concat(der.slice(derIndex));
}

function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
if (array.length === 1) return array;

  let division = split(array);

  let izq = division[0];
  let der = division[1];

  return unir(mergeSort(izq),mergeSort(der));
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  quickSort,
  mergeSort,
};
