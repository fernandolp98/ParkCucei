<?php
$codigo=$_POST['codigo'];
$nombre=$_POST['nombre'];
$placas=$_POST['placas'];

include('conexionBD.php');

if(Conectar())
{
    $query = "INSERT INTO vehiculo VALUES
    ('$codigo','$nombre','$placas')";

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