<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["id"]) && !empty($_POST["nombres"]) && !empty($_POST["apellidos"]) && !empty($_POST["correo"]) && !empty($_POST["rol"]) && !empty($_POST["estado"])) {
        $id = $_POST["id"];
        $nombres = $_POST["nombres"];
        $apellidos = $_POST["apellidos"];
        $correo = $_POST["correo"];
        $rol = $_POST["rol"];
        $estado = $_POST["estado"];
        
        $query = "call SP_EDITARUSUARIO('$id', '$nombres', '$apellidos', '$correo', '$estado', '$rol');";
        $result = mysqli_query($connection, $query);


        if(!$result){
            $json[] = array(
                "estado" => false,
                "mensaje" => "No se ha podido editar el usuario, ha ocurrido un problema con la base de datos!"
            );

            $json_string = json_encode($json);
            echo $json_string;
        } else {
            $json[] = array(
                "estado" => true,
                "mensaje" => "Se ha editado el usuario satisfactoriamente!"
            );
            
            $json_string = json_encode($json);
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }

?>