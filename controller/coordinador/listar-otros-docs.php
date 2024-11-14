<?php

    include("../../Resources/lib/connection.php");

    $rol = $_GET["rol"];

    $sp = "call SP_GETLISTOTROSDOCUMENTOS('$rol');";

    $query = mysqli_query($connection, $sp);

    if (!$query) {
        $json_string = json_encode("fallo");
        die;
    }

    $json = array();
    while($row = mysqli_fetch_array($query)){
        $json[] = array(
            "id" => $row["id_otros_documentos"],
            "nombre" => $row["nombre_documento"],
            "estado" => $row["estado"]
        );
    }

    $json_string = json_encode($json);
    echo $json_string;

    cerrarConexion($connection);

?>