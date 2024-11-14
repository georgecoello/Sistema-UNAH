<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["nombres"]) && !empty($_POST["apellidos"]) && !empty($_POST["identidad"]) && !empty($_POST["correo"]) && !empty($_POST["pass1"]) && !empty($_POST["cuenta"]) && !empty($_POST["excelencia"]) && !empty($_POST["carrera"]) && !empty($_POST["hash"]) && is_numeric($_POST["identidad"]) && is_numeric($_POST["cuenta"])) {
        $nombres = $_POST["nombres"];
        $apellidos = $_POST["apellidos"];
        $identidad = $_POST["identidad"];
        $correo = $_POST["correo"];
        $pass1 = $_POST["pass1"];
        $cuenta = $_POST["cuenta"];
        $excelencia = $_POST["excelencia"];
        $carrera = $_POST["carrera"];
        $hash = $_POST["hash"];

        
        

        $pass = password_hash($pass1, PASSWORD_DEFAULT);
        
        $query = "call SP_GUARDARESTUDIANTE('$nombres', '$apellidos', '$correo', '$pass', '$cuenta', '$identidad', '$excelencia', '$carrera', '$hash');";
        $result = mysqli_query($connection, $query);


        if(!$result){
            $json[] = array(
                "estado" => false,
                "mensaje" => "No se ha podido insertar nuevo estudiante, ha ocurrido un problema con la base de datos!"
            );

            $json_string = json_encode($json);
            echo $json_string;
        } else {
            $json[] = array(
                "estado" => true,
                "mensaje" => "Se ha creado el nuevo estudainte satisfactoriamente!"
            );
            
            $json_string = json_encode($json);
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }

?>