<?php

    include("../../Resources/lib/connection.php");

    $sp = "call SP_GETLISTROL();";

    $query = mysqli_query($connection, $sp);

    if (!$query) {
        die ("Query failed".mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($query)){
        $json[] = array(
            "id_rol" => $row["id_rol"],
            "nombre_rol" => $row["nombre_rol"]
        );
    }

    $json_string = json_encode($json);
    echo $json_string;

    cerrarConexion($connection);

?>
