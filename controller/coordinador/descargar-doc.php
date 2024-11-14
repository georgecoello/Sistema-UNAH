<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

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

        $link_doc = $BASEPATHDESCARGAS."".$json[0]["link"];

        header('Content-Description: File Transfer');
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        header('Content-Disposition: attachment; filename="'.basename($link_doc).'"');
        readfile($link_doc);
        
    }

    cerrarConexion($connection);

?>