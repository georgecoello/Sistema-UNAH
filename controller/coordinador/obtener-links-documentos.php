<?php

    include("../../Resources/lib/connection.php");

    $id = $_GET['id'];

    $sp = "call SP_GETLINKSDOCUMENTOSESTUDIANTE('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode('Fallo');

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "id" => $row["id_documento"],
                "link" => $row["link_documento"],
                "codigo" => $row["codigo_documento"],
                "estado" => $row["estado"],
                "estado_solicitud" => $row["estado_solicitud"]
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

    cerrarConexion($connection);

?>