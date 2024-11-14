<?php

    include("../../Resources/lib/connection.php");

    $sp = "call SP_GETLISTCARRERAS();";

    $query = mysqli_query($connection, $sp);

    if (!$query) {
        die ("Query failed".mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($query)){
        $json[] = array(
            "id_carrera" => $row["id_carrera"],
            "nombre_carrera" => $row["nombre_carrera"]
        );
    }

    $json_string = json_encode($json);
    echo $json_string;

    cerrarConexion($connection);

?>
