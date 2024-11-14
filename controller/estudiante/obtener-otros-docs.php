<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_GET["carrera"])){
        
        $carrera = $_GET["carrera"];
    

        $sp = "call SP_OBTENERDOCSOTROS('$carrera');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{
        
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    "id" => $row["id_otros_documentos"],
                    "nombre" => $row["nombre_documento"]
                );
            }

            $json_string = json_encode($json);
            echo $json_string;

            
        }

        cerrarConexion($connection);

    } else {
        echo json_encode("Fallo");
    }

?>