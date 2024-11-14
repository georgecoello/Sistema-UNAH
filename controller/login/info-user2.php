<?php
    include("../../Resources/lib/connection.php");

    $correo = $_POST["correo"];



    $validar = "call SP_VALIDARCORREO('$correo');";
    $result_validar = mysqli_query($connection, $validar);
    if(!$result_validar){
        die("Query failed");
    }
    

    
    $json = array();
    while($row = mysqli_fetch_array($result_validar)){
        $json[] = array(
            "id" => $row["id_usuario"],
            "correo" => $row["correo_usuario"],
            "estado" => $row["estado_usuario"],
            "pass" => $row["password_usuario"],
            "rol" => $row["id_rol"],
            "nombre_rol" => $row["nombre_rol"],
            "nombres" => $row["nombres_usuario"],
            "apellidos" => $row["apellidos_usuario"],
            "modulo" => $row["id_modulo"]
        );
    };



    $jsonstring = json_encode($json[0]);
    echo $jsonstring;


    
    cerrarConexion($connection);

?>