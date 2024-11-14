<?php

    include("../../Resources/lib/connection.php");

    $sp = "call SP_GETLISTFECHAENTREGAS();";

    $query = mysqli_query($connection, $sp);

    if (!$query) {
        die ("Query failed".mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($query)){
        $json[] = array(
            "id" => $row["id_periodo_entregas"],
            "inicio" => $row["fecha_inicio"],
            "fin" => $row["fecha_fin"],
            "estado" => $row["estado"]
        );
    }

    $json_string = json_encode($json);
    echo $json_string;

    cerrarConexion($connection);

?>