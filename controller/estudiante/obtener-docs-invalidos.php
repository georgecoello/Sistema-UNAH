<?php

    include("../../Resources/lib/connection.php");

    $id = $_GET['id'];

    $sp = "call SP_GETDOCUMENTOSINVALIDOS('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode('Fallo');

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(

                "codigo" => $row["codigo_documento"],
                "estado" => $row["estado"],
                "descripcion" => $row["descripcion"]
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

    cerrarConexion($connection);

?>