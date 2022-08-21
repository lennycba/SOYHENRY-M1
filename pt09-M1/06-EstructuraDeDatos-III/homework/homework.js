"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
//la funcion retorna la cantidad total de nodos en el arbol
//early return, si llegamos a un nodo hoja retornamos 1 al contador
//si llegamos a un nodo que tiene un hijo a izq y no tiene hijos a der, retornamos 1+ lo que siga hacia la izq
//si llegamos a un nodo que tiene un hijo a der y no tiene hijos a izq, retornamos 1+ lo que siga a der
//si llegamos a un nodo que tiene hijos a izq y der, retornamos 1+ lo que siga a izq + lo que siga a der
BinarySearchTree.prototype.size = function(){
  if (this.left === null && this.right === null) return 1;
  if (this.left !== null && this.right === null) return 1 + this.left.size();
  if (this.left === null && this.right !== null) return 1 + this.right.size();
  if (this.left !== null && this.right !== null) return 1 + this.left.size() + this.right.size();
};

//esta funcion inserta un nuevo nodo (arbol) siguiendo el patrón de diseño menores izq/ mayores der
//primero pregunta si el valor a agregar es mayor o menor al valor del root actual
//si el valor es mayor iría a la der, entonces pregunta si el right está vacío, si no lo esta ejecuta nuevamente la funcion hacia la derecha, si right es igual a null, es decir, está vacío, le asigna a right un NUEVO ARBOL con el value
//en el caso de que el valor sea menor al root actual, hace lo mismo pero hacia la izq
BinarySearchTree.prototype.insert = function(value){
 if(value > this.value){
    if(this.right !== null) {
      this.right.insert(value);
    }else this.right = new BinarySearchTree(value);
 };
 if (value < this.value){
    if (this.left !== null){
      this.left.insert(value); 
    }else this.left = new BinarySearchTree(value);
 }
};

//esta funcion retorna true o false dependiendo si el valor de argumento se encuentra o no en el arbol
//si el valor es igual al root devuelve true
//si el valor es mayor al root busca hacia la derecha y pregunta si hay un nodo derecho o si esta en null
//si esta en nul retorna false
//si no es null vuelve a ejecutar la funcion hacia la derecha
//si el valor es menor al root hace exactamente lo mismo pero hacia la izq
BinarySearchTree.prototype.contains = function(value){
  if (value === this.value) return true;

      if (value > this.value){
        if(this.right === null) return false
          else return this.right.contains(value);          
    }
    if (value < this.value){
      if(this.left === null) return false;
        else return this.left.contains(value);
    }
};
BinarySearchTree.prototype.depthFirstForEach = function(cb,order){
  if(order === 'pre-order'){
    //root-izq-der
    cb(this.value);
    if (this.left !== null) this.left.depthFirstForEach(cb, order);
    if (this.right !== null) this.right.depthFirstForEach(cb, order);
  }else if (order === 'post-order'){
    //izq-der-root
    if (this.left !== null) this.left.depthFirstForEach(cb, order);
    if (this.right !== null) this.right.depthFirstForEach(cb, order);
    cb(this.value);
  }else{
      //in order izq-root-der
      if (this.left !== null) this.left.depthFirstForEach(cb, order);
      cb(this.value);
      if (this.right !== null) this.right.depthFirstForEach(cb, order);
  }
};
BinarySearchTree.prototype.breadthFirstForEach = function(cb, array){
  if(!array){
    var array = [];
  }

  if (this.left !== null){
    array.push(this.left);
  }
  if (this.right !== null){
    array.push(this.right);
  }
  cb(this.value);

  if(array.length > 0 ){
    array.shift().breadthFirstForEach(cb, array);
  }
}; 

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
