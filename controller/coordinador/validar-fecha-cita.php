<?php
    include("../../Resources/lib/connection.php");

    if(!empty($_GET["fecha"]) && !empty($_GET["rol"])){

        $fecha = $_GET["fecha"];
        $rol =  $_GET["rol"];

        $sp = "call SP_VALIDARCITA('$rol', '$fecha');";
        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{
            
            $json = array();
            while($row = mysqli_fetch_array($result)){
                $json[] = array(
                    "numero" => $row["numero"],
                );
            }

            $jsonstring = json_encode($json[0]);
            echo $jsonstring;
            
        }

        cerrarConexion($connection);

    }else{
        echo json_encode("Fallo");
    }

    

?>