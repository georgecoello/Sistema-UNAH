<?php

    include("../../Resources/lib/connection.php");

    $id = $_POST['id'];

    $sp = "call SP_TRAERUSUARIO('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){
        die("Query failed");
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            "id" => $row["id_usuario"],
            "nombres" => $row["nombres_usuario"],
            "apellidos" => $row["apellidos_usuario"],
            "correo" => $row["correo_usuario"],
            "estado" => $row["estado_usuario"],
            "rol" => $row["id_rol"],
        );
    }

    $jsonstring = json_encode($json[0]);
    echo $jsonstring;

    cerrarConexion($connection);

?>