
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
x = 1;            
var a = 5;        // 2 lee que hay una variable a
var b = 10;       // 3  lee que hay una variable b
var c = function(a, b, c) 
{                     //  4 lee que hay una funcion c   // 6 crea un nuevo contexto 
  var x = 10;         // 7 lee que hay una nueva variable x con valor 10
  console.log(x);     // 8 imprime x (10) (contexto funcion c)
  console.log(a);     // 9 imprime el valor de a (8) que viene de argumento (contexto funcion c)
  var f = function(a, b, c) // 10 lee que hay una funcion f    // 12 crea un nuevo contexto 
  {                   
    b = a;                 // 13 crea una nueva variable b que es igual a la nueva variable a (8) por argumento (contexto funcion f)
    console.log(b);        // 14 imprime b (del contexto funcion f)
    b = c;                 // 15 actualiza b al valor de la nueva variable c (10) por argumento (contexto funcion f)
    var x = 5;             // 16 crea una nueva variable x con valor 5
  }                        // 17 termina el contexto de la funcion f
  f(a,b,c);                // 11 invoca la funcion f
  console.log(b);          // 18 imprime el valor de b (9) (contexto de la funcion c)
}                          // 19 termina el contexto de la funcion c
c(8,9,10);  
console.log(b);            // 20 imprime el valor de b (10) (contexto global)
console.log(x);            // 21 imprime el valor de x (1) (contexto global)
```

```javascript
console.log(bar);       // 1 undefined
console.log(baz);       // 2 error: baz is not defined
foo();
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;
```

```javascript
var instructor = "Tony"; 
if(true) {
    var instructor = "Franco";
}
console.log(instructor); // "Franco"
```

```javascript
var instructor = "Tony";
console.log(instructor);  // "Tony"
(
   function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor);   // "Franco"
   }
}
)();
console.log(instructor);  // "Tony"
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor);  // "The Flash"
    console.log(pm);          // "Reverse Flash"
}
console.log(instructor);  //"The Flash"
console.log(pm);           //"Franco"
```
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3"   // 2
"2" * "3" // 6
4 + 5 + "px" //"9px"
"$" + 4 + 5  // "$45"
"4" - 2 // 2
"4px" - 2 // NaN
7 / 0   // Infinity
{}[0]  // undefined 
parseInt("09") // 9
5 && 2 // 2
2 && 5 // 5
5 || 0 // 5
0 || 5 // 5
[3]+[3]-[10] // 23
3>2>1       // false
[] == ![] // true
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a);   //undefined
   console.log(foo());  // 2

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

Y el de este código? :

```javascript
var snack = 'Meow Mix';  //no tiene salida en ningun momento se le pide imprimir un valor

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false);
```


### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname()); //'Aurelio De Rosa' (el this lo condiciona a buscar primero dentro de su entorno)

var test = obj.prop.getFullname;

console.log(test());  // juan perez (la función es llamada desde el entorno global, por ende el this hace referencia al entorno global)
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
//primero ejecuta el c.log de la primera linea, pasa a la siguiente donde lee un timeout y lo coloca en pila de ejecución
//luego pasa a la tercera linea donde lee nuevamente un timeout y lo coloca tambien en la pila
//imprime lo que manda la cuarta linea, luego espera 0 milisegundos y ejecuta el c.log de la linea 3
//finalmente espera 1000 milisegundos y ejecuta el c.log de la linea 2
function printing() {
   console.log(1);  // 1
   setTimeout(function() { console.log(2); }, 1000); //4
   setTimeout(function() { console.log(3); }, 0);  //3
   console.log(4); // 2
}

printing();
```
