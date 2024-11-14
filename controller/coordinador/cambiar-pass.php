<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["id"]) && !empty($_POST["pass1"])){

        $id = $_POST["id"];
        $pass1 = $_POST["pass1"];

        $pass = password_hash($pass1, PASSWORD_DEFAULT);


        $query = "call SP_CAMBIARPASSWORD2('$pass', '$id');";
        $result = mysqli_query($connection, $query);

        if(!$result){
            echo json_encode("Error");
        } else {
            echo json_encode("Exito");
        }

        cerrarConexion($connection);

    } else {
        echo json_encode("Vacios");
    }

    

?>