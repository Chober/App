<?php
/**
*
*Este archivo estará a la escucha de llamadas procedentes del cliente JAVA
*/
//--Incluimos el archivo en usuarioClass.php
require_once("Conexion.php"); 
//Comprobamos si hemos recibido alguna llamada por POST
if(isset($_POST["json"])){
    $json = $_POST["json"];
    $json = urldecode($json);
    $json = str_replace("\\", "",$json);
    $jsonencode = json_decode($json);
 
    //--Creamos un objeto de la clase usuarioClass
    $userObject = new Usuarios();
    //Insertamos un nuevo usuario en la base de datos
    //$userObject->createUser($jsonencode[0]->ID_Maquina,$jsonencode[0]->Descripcion,$jsonencode[0]->Estado);
    $userObject->
}