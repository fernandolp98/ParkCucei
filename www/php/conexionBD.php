<?php
$conexion;
function Conectar(){
    $host = "localhost";
    $user = "root";
    $password = "root";
    $database = "parkcucei";
    error_reporting(0);
    global $conexion;
    $conexion = mysqli_connect($host, $user, $password, $database);
    if(!$conexion){
        die(mysqli_connect_error());
    }
    else{
        return true;
    }
}
function Desconectar(){
    global $conexion;
    mysqli_close($conexion);
}
function Enviar($query){
    global $conexion;
    Conectar();
    $result = mysqli_query($conexion, $query) or die(mysqli_error());
    if($result){
        desconectar();
        return true;
    }    
    else{
        desconectar();
        return false;;
    }
}
?>