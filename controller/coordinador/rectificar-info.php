<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_POST["id"]) && !empty($_POST["comentario"])){
        
        $id = $_POST['id'];
        $comentario = $_POST['comentario'];
    

        $sp = "call SP_RECTIFICARINFOESTUDIANTE('$id','$comentario');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{
        
            echo json_encode("Hecho");
        }

        cerrarConexion($connection);


    } else {
        echo json_encode("Fallo");
    }

    

?>