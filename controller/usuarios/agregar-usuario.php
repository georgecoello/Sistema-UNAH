<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["nombres"]) && !empty($_POST["apellidos"]) && !empty($_POST["correo"]) && !empty($_POST["rol"]) && !empty($_POST["pass"]) && !empty($_POST["estado"])) {
        $nombres = $_POST["nombres"];
        $apellidos = $_POST["apellidos"];
        $correo = $_POST["correo"];
        $rol = $_POST["rol"];
        $pass1 = $_POST["pass"];
        $estado = $_POST["estado"];


        $pass = password_hash($pass1, PASSWORD_DEFAULT);
        
        $query = "call SP_GUARDARUSUARIO('$nombres', '$apellidos', '$correo', '$pass', '$estado', '$rol');";
        $result = mysqli_query($connection, $query);


        if(!$result){
            $json[] = array(
                "estado" => false,
                "mensaje" => "No se ha podido insertar nuevo usuario, ha ocurrido un problema con la base de datos!"
            );

            $json_string = json_encode($json);
            echo $json_string;
        } else {
            $json[] = array(
                "estado" => true,
                "mensaje" => "Se ha creado el nuevo usuario satisfactoriamente!"
            );
            
            $json_string = json_encode($json);
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }

?>