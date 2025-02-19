<?php

    include("../../Resources/lib/connection.php");

    $limit = $_GET["limit"];
    $rol = $_GET["rol"];
    $offset = $_GET["offset"];

    $sp = "call SP_LISTARROBSERVACIONES('$limit', '$offset',''$rol);";

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
                "numero_cuenta" => $row["numero_cuenta_estudiante"],
                "id_comentario_informacion" => $row["id_comentario_informacion"], 
                "comentario" => $row["comentario"]
            );
        }

        $json_string = json_encode($json);
        echo $json_string;

    }

    cerrarConexion($connection);
    

?>