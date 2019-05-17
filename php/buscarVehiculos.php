<?php
include("conexionBD.php");



if(isset($_POST['codigo'])){
    $codigo = $_POST['codigo'];
    $query = "SELECT * FROM vehiculo WHERE codigo = '$codigo'";
    if(Conectar()){
        $result = mysqli_query($conexion, $query);
        $json = array();
        if($result){
            if(mysqli_num_rows($result) > 0){
                while($row = mysqli_fetch_array($result)){
                    $json[] = $row;
                }
                echo json_encode($json);
            }
            else{
                echo "0";
            }
        }
        else{
            die(mysqli_error($conexion));
        }
    }
}

?>