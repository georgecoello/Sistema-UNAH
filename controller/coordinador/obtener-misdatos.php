<?php

    include("../../Resources/lib/connection.php");

    $id = $_GET['id'];

    $sp = "call SP_GETMISDATOS('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode("Fallo");

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "nombres" => $row["nombres_usuario"],
                "apellidos" => $row["apellidos_usuario"],
                "correo" => $row["correo_usuario"],
                "rol" => $row["nombre_rol"],
            );
        }

        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }

    cerrarConexion($connection);

?>