<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_POST["id"])){
        $id = $_POST['id'];
    

        $sp = "call SP_VALIDARDOCUMENTO('$id');";

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