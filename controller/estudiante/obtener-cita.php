<?php

    include("../../Resources/lib/connection.php");

    $id = $_GET['id'];

    $sp = "call SP_OBTENERFECHACITA('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode('Fallo');

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "cita" => $row["fecha_cita"]
            );
        }

        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }

    cerrarConexion($connection);

?>