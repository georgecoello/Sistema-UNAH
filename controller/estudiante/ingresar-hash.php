<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["id"])) {

        $id = $_POST["id"];

        
        $query = "call SP_INGRESARHASH('$id');";
        $result = mysqli_query($connection, $query);


        if(!$result){

            $json_string = json_encode('Fallo');
            echo $json_string;


        } else {

            $json_string = json_encode('Exito');
            echo $json_string;

        }

        cerrarConexion($connection);
        
    } else{

        $json_string = json_encode('Fallo');
        echo $json_string;

    }

?>