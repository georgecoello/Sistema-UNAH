<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["nombre"]) && !empty($_POST["estado"]) && !empty($_POST["rol"])) {
        $nombre = $_POST["nombre"];
        $estado = $_POST["estado"];
        $rol = $_POST["rol"];

        
        $query = "call SP_AGREGAROTRODOC('$nombre', '$rol', '$estado');";
        $result = mysqli_query($connection, $query);


        if(!$result){
            $json[] = array(
                "estado" => false,
                "mensaje" => "No se ha podido insertar nuevo documento, ha ocurrido un problema con la base de datos!"
            );

            $json_string = json_encode($json);
            echo $json_string;
            
        } else {
            $json[] = array(
                "estado" => true,
                "mensaje" => "Se ha creado el nuevo documento satisfactoriamente!"
            );
            
            $json_string = json_encode($json);
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }

?>