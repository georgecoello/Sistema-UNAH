<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["id"]) && !empty($_POST["token"])){

        $id = $_POST["id"];
        $token = $_POST["token"];

        $query = "call SP_OBTENERTOKEN('$token', '$id');";
        $result = mysqli_query($connection, $query);
        $contador = mysqli_num_rows($result);

        if(!$result){
            echo json_encode("Error consulta");
        } else {

            if($contador >= 1) {
                
                $json = array();
                while($row = mysqli_fetch_array($result)){
                    $json[] = array(
                        "token" => $row["token"],
                        "estado_token" => $row["estado_token"],
                        "id_usuario" => $row["Usuario_id_usuario"]
                    );
                }

                $json_string = json_encode($json);
                echo $json_string;


            } else{
                echo json_encode("Sin token");
            }

        }

        cerrarConexion($connection);

    } else {
        echo json_encode("Vacios");
    }

?>