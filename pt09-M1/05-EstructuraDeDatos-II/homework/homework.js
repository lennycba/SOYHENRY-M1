"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
this._length = 0;
this.head = null;
}

function Node(value) {
this.value = value;
this.next = null;
}

//-------------------------------------------------------------------------------------
LinkedList.prototype.add = function(data){
  let nodo = new Node(data); //instancion un nuevo nodo con el value data
  var current = this.head; //le asigno a current el valor de head

  //si la lista está vacía

  if (!current){  //si current es null quiere decir que la lista esta vacia
    this.head = nodo; //entonces le asigno nodo al head
    this._length ++;  //e incremento length
    return nodo;      //finalmente retorno el nodo para cortar la ejecución
  };

  //si la lista tiene al menos algun nodo
  //head 1 -> 5 -> 3 -> null
  //current = head = 1 ==> current.next = 5 (no es null) ==> current = current.next
  //current = 5 ==> current.next = null ===> mi current es el ultimo valor de la lista
  //current.next = nodo agrega un nodo despues de mi current actual (5), o sea, al final de la lista.
  

  while (current.next){ //mientras adelante del current haya otro nodo
    current = current.next; //avanza al siguiente nodo
  }
    current.next = nodo;
    this._length ++;
    return nodo;
};
//----------------------------------------------------------------------------------------
LinkedList.prototype.remove = function(){
  var current = this.head;
  if (this._length === 0) return null; //si length es 0 quiere decir que la lista esta vacia
    else if (this._length === 1){ //si length es 1 hay un solo nodo en la lista
      var auxiliar = current.value; //guardamos el valor del nodo
      this.head = null; //nulleamos el head, ahora la lista quedo vacía
      this._length --; //ponemos en 0 el length
      return auxiliar; //retornamos el valor del nodo que borramos
    }
    //head -> 1 -> 3 -> 5 -> null
    //             ^ //el current.next es 5 y el siguiente es null, por ende borramos current.next
    while(current.next.next){ //tenemos que mirar dos pasos hacia adelante
      current = current.next; //pero avanzamos un paso a la vez
    }
     auxiliar = current.next.value; //guardamos el VALOR del nodo antes de borrarlo
    current.next = null; //borramos el nodo
    this._length --;  //reducimos el length
    return auxiliar;  //retornamos el VALOR del nodo borrado
  };
//------------------------------------------------------------------------------------------
LinkedList.prototype.search = function(value){
  var current = this.head;
    if (!current) return null;
      while (current){
          if (current.value === value) return current.value;
            else if (typeof (value) === 'function'){
              if (value(current.value)) return current.value;
            }
        current = current.next;
      }
  return null;
};

/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

function HashTable() {  //creo la hash table con la cantidad de buckets y donde se almacenan
  this.numBuckets = 35;
  this.buckets = []; //cada bucket es una posicion en el array 
}

//la funcion suma el charCodeAt de cada letra y luego divide ese valor por la cantidad de buckets retornando EL MODULO de esa division
HashTable.prototype.hash = function(key){ //recibo una key
  let suma = 0; //inicializo un acumulador
  for (let i = 0; i < key.length; i++) {
    suma += key.charCodeAt(i); //iterando sumo el charCodeAt de cada letra
  }
  return suma % this.numBuckets; //divido el acumulador por la cant. de buckets y retorno el modulo
};
//-----------------------------------------------------------------------------------------
//una vez que ya tengo la funcion que se va a encargar de organizar las keys en los buckets creo las funciones set get y hasKey

//1--voy a recibir una clave y un valor, primero verifico que la clave sea una string, si no lo es ARROJO un error de tipo
//2--si es una clave válida la paso por la funcion hasheadora para obtener el bucket en que se va a almacenar
//3--puede darse que dos keys distintas vayan a parar al mismo bucket, para evitar colisiones (errores o sobreescritura) cada vez que una clave va a parar a un bucket vacío creo un objeto nuevo, ahora cada bucket es un objeto por lo que no importa si mas que dos claves compartan bucket se almacenaran como pares clave-valor dentro del bucket.
//4-- finalmente almaceno el par clave-valor en el bucket (let posicion) correspondiente 
HashTable.prototype.set = function(key, value){
if (typeof (key) !== 'string') throw new TypeError ('Keys must be a string');
  let posicion = this.hash(key);
  if (this.buckets[posicion] === undefined){
    this.buckets[posicion] = {};
  }
  this.buckets[posicion][key] = value;
};
//----------------------------------------------------------------------------------------
//1--voy a recibir una key y la funcion deberá devolver el valor correspondiente a esa key (agregado fuera de ejercicio validacion de key)
//2--hasheando la key averiguo el bucket donde DEBERIA estar almacenado el par clave-valor
//3--(en la validacion verifico si en el bucket verdaderamente esta la key que me piden)
//4--si la key existe retorno el valor correspondiente a esa key
//--si la key NO existe retorno un error

HashTable.prototype.get = function(key){
  if (typeof (key) !== 'string') throw new TypeError ('Keys must be a string');
  let posicion = this.hash(key);
  if (this.buckets[posicion].hasOwnProperty(key)){
    return this.buckets [posicion] [key];
  }else return 'la propiedad '+ key + ' no está definida'; 
};
//------------------------------------------------------------------------------------------
//recibo una key y debo retornar un booleano que indique si esa key existe o no en el bucket correspondiente
//1--hasheo la key para obtener el bucket donde debería estar almacenado
//2--usando hasOwnProperty puedo verificar CON UN BOOLEANO si la key existe en ese bucket
HashTable.prototype.hasKey = function(key){
  if (typeof (key) !== 'string') throw new TypeError ('Keys must be a string');
  let posicion = this.hash(key);
  return this.buckets[posicion].hasOwnProperty(key);
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
