/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        StatusBar.backgroundColorByHexString('#E82C0C');
        console.log(StatusBar);
        FastClick.attach(document.body);    
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
var menu = document.getElementById("menu");     //Instanciamos una unica ves el elemento menu
var inicio = document.getElementById("inicio"); //Instanciamos una unica ves la ventana inicio
var carrito = document.getElementById("carrito");
var actual,nueva; //Instanciamos actual y nueva para hacer las transiciones entre ventanas

function moverVentana(ventana){ // Funcion Generica para movernos desde cualquier ventana a la ventana target
    nueva = document.getElementById(ventana); //Modificamos la variable nueva y la igualamos a la ventana target
    actual = menu.parentElement; //Actualizamos la variable actual y la igualamos al elemento o ventana que contenga en ese momento el menu
    transicionVentanas(actual, nueva); //Hacemos la transicion de ventanas de la actual a la target
    nueva.insertBefore(menu, nueva.childNodes[0]); //Insertamos el menu como primer elemento de nuestra ventana target
}

 function moverVentanaProductos (ventana) {// Funcion para movernos desde cualquier ventana a productos es necesaria para cargar los productos
     moverVentana(ventana); //Llamamos a la funcion generica de cambio de ventana
     obtenerProductos(); //Imprimimos los productos obtenidos por la base de datos*********Modificacion para usar filtros a la hora de buscar productos
 }

function moverInicio() { //Funcion para movernos desde cualquier ventana a inicio es necesaria para dejar el menu fuera de la ventana de inicio
    actual = menu.parentElement;//Obtenemos la ventana que en ese momento sea contenida por el menu
    transicionVentanas(actual, inicio);//Hacemos la transicion desde la ventana actual a la ventana de inicio
    //En esta funcion no insertamos el menu ya que nos dirige a la ventana de inicio
}

function moverVentana1() { //Funcion para movernos desde inicio a la ventana 1 es necesaria por que como solo se puede usar desde inicio pero este no tiene menu
    nueva = document.getElementById("ventana1"); //Igualamos el elemento ventana1 y lo asignamos a nueva
    transicionVentanas(inicio, nueva); //Hacemos la transicion desde inicio a la ventana1
    nueva.insertBefore(menu, nueva.childNodes[0]); //Agregamos el menu a nuestra ventana
}

function moverProducto(elemento){//Funcion para irnos a la ventana del producto en donde visualizaremos su informacion*********************************
    var imagen = document.getElementById("imgProducto"); //Creamos una variable con el nombre imagen y la igualamos al elemento imgProducto
    var txtProducto = document.getElementById("txtProducto");//Creamos una variable con el nombre txtProducto y la igualamos al elemento txtProducto
    moverVentana("VentanaProducto");//Llamamos a la funcion generica de cambio de ventana
    imagen.src = elemento.parentElement.childNodes[0].src;//Al elemento imagen le modificamos la fuente y la igualamos al elemento 0 del nodo padre
    txtProducto.innerHTML = elemento.parentElement.childNodes[1].innerHTML;//Al elemento txtProducto le modificamos el texto por el del elemento 0 del nodo padre 
    //Lo hacemos de esta forma para que en la funcion mandemos this como parametro asi no importa si clickeamos la imagen o el texto 
}

function moverLogin(){
    nueva = document.getElementById("logins");
    transicionVentanas(inicio, nueva);
}
function moverCrearCuenta(){
    nueva = document.getElementById("crearCuenta");
    transicionVentanas(inicio, nueva);
}

function moverAtras(){ //Funcion para regresar entre capas*****************************Bugs 
    transicionVentanas(nueva, actual);
    actual.insertBefore(menu, actual.childNodes[0]);
}

function transicionVentanas(anterior, siguiente){//Funcion Generica para hacer transicion entre ventanas pidiendo la ventana actual y la target
    anterior.classList.add("leftTotal");//A la ventana anterior le agregamos la clase leftTotal para sacarla de la webview
    siguiente.classList.remove("leftTotal");//A la ventana siguiente le quitamos la clase leftTotal para que quede dentro de la webview
}

function obtenerProductos(){ //Funcion para mostrar todos los productos disponibles************************************Necesita Cambio
    var cantidadDeProductos = 33; //Esto lo substituiremos por el resultado que nos arroje la base de datos *******************************Necesita Cambio
    var lado = 0;                                       // Variable para determinar de que lado se imprimira el siguiente producto
    var izquierda = document.getElementById("izquierda"); //Instanciamos la columna de la izquierda
    var derecha = document.getElementById("derecha"); //Instanciamos la columna de la derecha

    izquierda.innerHTML = "";   //Limpiamos el contenido de la columna de la izquierda
    derecha.innerHTML = "";     //Limpiamos el contenido de la columna de la derecha
    //Esto lo hacemos para evitar que se cargen productos repetidos de una carga anterior

    for (var i = 1; i <= cantidadDeProductos ; i++) {  //For para recorrer cada uno de los productos
        var producto = document.createElement("img"); //Creamos un elemento del tipo imagen
        var nombre = document.createElement("p"); //Creamos un elemento del tipo parrafo
        var div = document.createElement("div"); //Creamos un elemento del tipo division para que contenga la imagen y el parrafo
        producto.src = "img/foto"+i+".jpg"; //Asignamos la url de la imagen *****************Esta parte se cambiara por lo que nos entregue la base de datos
        producto.classList.add("producto"); //Agregamos a la imagen la clase producto que contiene tamaño
        div.appendChild(producto); //Agregamos la imagen al div
        div.appendChild(nombre); //Agregamos el parrafo al div
        producto.onclick = function() {moverProducto(this)}; //Agregamos un evento onclick a la imagen que tiene como funcion moverProducto(this) 
        nombre.onclick = function() {moverProducto(this)}; //Agregamos un evento onclick al parrafo que tiene como funcion moverProducto(this)
        nombre.innerHTML = "soy el producto " + i; //Escribimos en el Parrafo la descripcion del producto*****Esta parte se cambia por la descripcion que nos entregue la base de datos
        if (lado==0) //Si la variable lado es igual a 0 corre lo siguiente
        {
            izquierda.appendChild(div); //Agregamos el objeto div a nuestra columna izquierda
            lado = 1; //Cambiamos el lado para que el siguiente imprima del lado derecho
        }else //Si la variable lado no fue 0 correra lo siguiente
        {
            derecha.appendChild(div); //Agregamos el objeto div a nuestra columna derecha
            lado=0; //Cambiamos el lado para que el siguiente imprima del lado izquierdo
        }
    }
}

function agregar(){
    var imgCarrito = document.createElement("img");
    var nombreCarrito = document.createElement("p");
    var divCarrito = document.createElement("div");

    imgCarrito.src = document.getElementById("imgProducto").src;
    nombreCarrito.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;"+document.getElementById("txtProducto").innerHTML;
    
    imgCarrito.classList.add("productoCarrito");
    nombreCarrito.classList.add("nombreCarrito");
    imgCarrito.align = "middle";

    divCarrito.appendChild(imgCarrito);
    divCarrito.appendChild(nombreCarrito);
    carrito.appendChild(divCarrito);

    moverVentana("carrito");
}

function showUser() {
        document.getElementById("txtHint").innerHTML = "";
        cuenta = document.getElementById("cuentaLogin").value;
        contra = document.getElementById("contraLogin").value;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            var xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200)
            {
                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            }
        };
        var link ="http://chobe.com.mx/www/php/ListenPost.php?cuenta="+cuenta+"&contra="+contra;
        xmlhttp.open("GET",link,true);
        xmlhttp.send();
    }


