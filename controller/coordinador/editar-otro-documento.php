<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["nombre"]) && !empty($_POST["estado"]) && !empty($_POST["rol"]) && !empty($_POST["id"])) {
        $id = $_POST["id"];
        $nombre = $_POST["nombre"];
        $estado = $_POST["estado"];
        $rol = $_POST["rol"];
        
        $query = "call SP_EDITAROTRODOC('$id', '$nombre', '$rol', '$estado');";
        $result = mysqli_query($connection, $query);


        if(!$result){
            $json[] = array(
                "estado" => false,
                "mensaje" => "No se ha podido editar el documento, ha ocurrido un problema con la base de datos!"
            );

            $json_string = json_encode($json);
            echo $json_string;
            
        } else {
            $json[] = array(
                "estado" => true,
                "mensaje" => "Se ha editado el documento satisfactoriamente!"
            );
            
            $json_string = json_encode($json);
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }

?>