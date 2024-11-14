<?php

    include("../../Resources/lib/connection.php");

    
    if(!empty($_POST["id_solicitud"]) && !empty($_POST["id_estudiante"]) && !empty($_POST["id_coordinador"]) && !empty($_POST["fecha"])){

        $solicitud = $_POST['id_solicitud'];
        $estudiante = $_POST['id_estudiante'];
        $coordinador = $_POST['id_coordinador'];
        $fecha = $_POST['fecha'];
    

        $sp = "call SP_VALIDARSOLICITUD('$solicitud', '$estudiante', '$coordinador', '$fecha');";

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