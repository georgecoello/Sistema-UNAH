<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["id"]) && !empty($_POST["nombres"]) && !empty($_POST["apellidos"]) && !empty($_POST["identidad"]) && !empty($_POST["correo"]) && !empty($_POST["cuenta"]) && !empty($_POST["excelencia"]) && !empty($_POST["carrera"])) {
        $id = $_POST["id"];
        $nombres = $_POST["nombres"];
        $apellidos = $_POST["apellidos"];
        $identidad = $_POST["identidad"];
        $correo = $_POST["correo"];
        $cuenta = $_POST["cuenta"];
        $excelencia = $_POST["excelencia"];
        $carrera = $_POST["carrera"];
        
        $query = "call SP_UPDATEINFOESTUDIANTE('$id', '$nombres', '$apellidos', '$correo', '$cuenta', '$excelencia', '$carrera', '$identidad');";
        $result = mysqli_query($connection, $query);


        if(!$result){

            $json_string = json_encode('Fallo');
            echo $json_string;


        } else {

            $json_string = json_encode('Exito');
            echo $json_string;

        }

        cerrarConexion($connection);
        
    } else{

        $json_string = json_encode('Fallo');
        echo $json_string;

    }

?>