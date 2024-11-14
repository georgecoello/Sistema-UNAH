<?php

    include("../../Resources/lib/connection.php");

    if(!empty($_GET["id_estudiante"])){
        $id = $_GET['id_estudiante'];

        $sp = "call SP_OBTENERRUTASOLICITUD('$id');";

        $result = mysqli_query($connection, $sp);
        if(!$result){

            echo json_encode('Fallo');

        }else{
        
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    "link" => $row["ruta_solicitud"],
                    "id" => $row["id_solicitud"],
                    "estado" => $row["estado"]
                );
            }
            
            $jsonstring = json_encode($json[0]);
            echo $jsonstring;
        }

        cerrarConexion($connection);
        
    }else{
        echo json_encode('Fallo');
    }

    

?>