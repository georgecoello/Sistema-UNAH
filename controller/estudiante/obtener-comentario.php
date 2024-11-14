<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_GET["id"])){
        
        $id = $_GET["id"];
    

        $sp = "call SP_GETCOMENTARIOINFO('$id');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{
        
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    "comentario" => $row["comentario"]
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