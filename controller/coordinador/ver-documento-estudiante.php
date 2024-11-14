<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

    $id = $_GET['id'];

    $sp = "call SP_GETLINKDOC('$id');";

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

        $link_doc = $BASEPATHEXPEDIENTES."".$json[0]["link"];

        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="'.basename($link_doc).'"');
        readfile($link_doc);
        
    }

    cerrarConexion($connection);

?>