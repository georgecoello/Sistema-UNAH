<?php

    include("../../Resources/lib/connection.php");

    $solicitud = $_GET['solicitud'];

    $sp = "call SP_OBTENERDESCRIPCIONDOCINVALIDO('$solicitud');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode('Fallo');

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "id" => $row["id_documento"],
                "descripcion" => $row["descripcion"],
                "codigo" => $row["codigo_documento"],
                "estado" => $row["estado"]
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }


    cerrarConexion($connection);

?>