<?php

    include("../../Resources/lib/connection.php");

    if(!empty($_GET["id_student"])){

        $id = $_GET["id_student"];
    

        $sp = "call SP_GETDOCUMENTOSSUBIDOS('$id');";

        $query = mysqli_query($connection, $sp);

        if (!$query) {

            echo json_encode("problema");

        } else{

            $json = array();
            while($row = mysqli_fetch_array($query)){
                $json[] = array(
                    "id" => $row["id_documento"],
                    "link" => $row["link_documento"],
                    "codigo" => $row["codigo_documento"]
                );
            }

            $json_string = json_encode($json);
            echo $json_string;

        }

        cerrarConexion($connection);

    } else {
        echo json_encode("problema");
    }


    

    

?>
