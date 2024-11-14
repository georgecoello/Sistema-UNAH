<?php

    include("../../Resources/lib/connection.php");

    $id = $_POST['id'];

    $sp = "call SP_TRAERESTUDIANTESINVALIDAR('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo "Fallo";

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "id" => $row["id_estudiante"],
                "nombres" => $row["nombres_usuario"],
                "apellidos" => $row["apellidos_usuario"],
                "cuenta" => $row["numero_cuenta_estudiante"],
                "identidad" => $row["identidad_estudiante"],
                "correo" => $row["correo_usuario"],
                "excelencia" => $row["estado_excelencia"],
                "carrera" => $row["nombre_carrera"],
            );
        }

        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }

    cerrarConexion($connection);

?>