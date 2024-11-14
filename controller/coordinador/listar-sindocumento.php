<?php

    include("../../Resources/lib/connection.php");

    $limit = $_GET["limit"];
    $offset = $_GET["offset"];
    $rol = $_GET["rol"];
    $estado = $_GET["estado"];

    $sp = "call SP_GETLISTESTUDIANTESINDOCUMENTO('$limit','$offset','$rol', '$estado');";

    $query = mysqli_query($connection, $sp);

    if (!$query) {
        echo json_encode("problema");
    } else{
        $json = array();
        while($row = mysqli_fetch_array($query)){
            $json[] = array(
                "id_estudiante" => $row["id_estudiante"],
                "nombres_estudiante" => $row["nombres_usuario"],
                "apellidos_estudiante" => $row["apellidos_usuario"],
                "numero_cuenta" => $row["numero_cuenta_estudiante"]
            );
        }

        $json_string = json_encode($json);
        echo $json_string;

    }

    cerrarConexion($connection);

?>