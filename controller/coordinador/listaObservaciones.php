<?php
    include("../../Resources/lib/connection.php");

    $rol = $_GET["rol"] ?? "";
    $buscador = $_GET["buscador"] ?? "";
    $numero_registros = $_GET["limite"] ?? 10; // Número de registros por página
    $offset_registros = $_GET["offset"] ?? 0;  // Desde qué registro empezar

    $sp = "CALL SP_GETLISTOBSERVACIONES($numero_registros, $offset_registros);";
    $query = mysqli_query($connection, $sp);

    if (!$query) {
        echo json_encode(["error" => "Problema al ejecutar la consulta"]);
    } else {
        $json = [];
        while ($row = mysqli_fetch_array($query)) {
            $json[] = [
                "id_estudiante" => $row["id_estudiante"],
                "nombres_estudiante" => $row["nombres_usuario"],
                "apellidos_estudiante" => $row["apellidos_usuario"],
                "numero_cuenta" => $row["numero_cuenta_estudiante"],
                "comentario" => $row["comentario"]
            ];
        }
        echo json_encode($json);
    }

    cerrarConexion($connection);
?>
