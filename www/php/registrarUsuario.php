<?php
$codigo=$_POST['codigo'];
$nip=$_POST['nip'];
$nombre=$_POST['nombre'];
$centro=$_POST['centro'];
$carrera=$_POST['carrera'];

include('conexionBD.php');

if(Conectar())
{
    $query = "INSERT INTO usuario VALUES
    ('$codigo','$nip','$nombre','$centro','$carrera')";

    if(Enviar($query))
    {
        echo "1";
    }
    else
    {
        echo "0";
    }
    Desconectar();
}


?>