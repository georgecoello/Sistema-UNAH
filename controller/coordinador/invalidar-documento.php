<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_POST["id_doc"]) && !empty($_POST["id_user"]) && !empty($_POST["descripcion"])){

        $id_doc = $_POST['id_doc'];
        $id_user = $_POST['id_user'];
        $descripcion = $_POST['descripcion'];
    

        $sp = "call SP_INVALIDARDOCUMENTO('$id_doc', '$id_user', '$descripcion');";

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