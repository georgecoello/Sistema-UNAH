<?php

    include("../../Resources/lib/connection.php");

    $sp = "call SP_GETLISTAUSUARIO();";

    $query = mysqli_query($connection, $sp);

    if (!$query) {
        die ("Query failed".mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($query)){
        $json[] = array(
            "id_usuario" => $row["id_usuario"],
            "nombres_usuario" => $row["nombres_usuario"],
            "correo_usuario" => $row["correo_usuario"],
            "apellidos_usuario" => $row["apellidos_usuario"],
            "nombre_rol" => $row["nombre_rol"],
            "estado_usuario" => $row["estado_usuario"]
        );
    }

    $json_string = json_encode($json);
    echo $json_string;

    cerrarConexion($connection);

?>
