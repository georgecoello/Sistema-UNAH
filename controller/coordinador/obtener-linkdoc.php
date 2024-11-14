<?php

    include("../../Resources/lib/connection.php");

    $id = $_GET['id'];

    $sp = "call SP_GETLINKDOCESTUDIANTE('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode('Fallo');

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "link" => $row["link_documento"]
            );
        }

        echo json_encode($json[0]);
        
    }

    cerrarConexion($connection);

?>