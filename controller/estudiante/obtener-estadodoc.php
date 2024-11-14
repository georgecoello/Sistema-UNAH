<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_GET["id_user"])){
        
        $id = $_GET["id_user"];
    

        $sp = "call SP_GETESTADODOCESTUDIANTE('$id');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{
        
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    "id" => $row["id_estudiante"],
                    "estado" => $row["estado_documento_descarga"]
                );
            }

            $json_string = json_encode($json[0]);
            echo $json_string;

        }

        cerrarConexion($connection);


    } else {
        echo json_encode("Fallo");
    }

?>