<?php
$codigo=$_POST['codigo'];

include('conexionBD.php');

if(Conectar())
{
    $query = "DELETE FROM vehiculo WHERE id = $codigo";

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