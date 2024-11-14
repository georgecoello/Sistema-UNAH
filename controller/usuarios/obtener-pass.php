<?php
    include("../../Resources/lib/connection.php");

    $id = $_POST['id'];
    $passAct = $_POST['passAct'];


    $sp = "call SP_PASSWORD('$id');";

    $result = mysqli_query($connection, $sp);

    if(!$result){
        echo "No se ha podido obtener contaseña de la base de datos";
    } else{

        while($row = mysqli_fetch_array($result)){
            $pass=$row["password_usuario"];
        }

        $estado = password_verify($passAct, $pass);

        echo json_encode($estado);
    }

    cerrarConexion($connection);
    

?>