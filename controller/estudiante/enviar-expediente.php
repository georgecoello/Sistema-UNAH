<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["id_estudiante"]) && !empty($_POST["estado"])) {

        $id = $_POST["id_estudiante"];
        $estado = $_POST["estado"];
        
        $query = "call SP_ENVIAREXPEDIENTE('$id', '$estado');";
        $result = mysqli_query($connection, $query);


        if(!$result){

            $json_string = json_encode("Error");
            echo $json_string;
            
        } else {
            
            $json_string = json_encode("Exito");
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }else{
        $json_string = json_encode("Error");
        echo $json_string;
    }

?>