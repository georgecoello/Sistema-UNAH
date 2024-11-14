<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_POST["id"]) && !empty($_POST["fecha"])){

        $id = $_POST['id'];
        $fecha = $_POST['fecha'];
    

        $sp = "call SP_EDITARCITA('$fecha', '$id');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo1");

        }else{
        
            echo json_encode("Hecho");
        }

        cerrarConexion($connection);

    } else {
        echo json_encode("Fallo2");
    }

    

?>