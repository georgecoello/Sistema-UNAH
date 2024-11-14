<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_GET["id_user"])){
        
        $id = $_GET["id_user"];
    

        $sp = "call SP_GETDATOSESTUDIANTE('$id');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{
        
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    "id_usuario" => $row["id_usuario"],
                    "id" => $row["id_estudiante"],
                    "nombres" => $row["nombres_usuario"],
                    "apellidos" => $row["apellidos_usuario"],
                    "cuenta" => $row["numero_cuenta_estudiante"],
                    "identidad" => $row["identidad_estudiante"],
                    "correo" => $row["correo_usuario"],
                    "excelencia" => $row["estado_excelencia"],
                    "carrera" => $row["id_carrera"],
                    "estado_info" => $row["estado_informacion"],
                    "hash" => $row["hash_correo"]
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