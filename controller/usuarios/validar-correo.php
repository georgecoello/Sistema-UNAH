<?php
    include("../../Resources/lib/connection.php");

    $correo = $_POST["correo"];


    $validar = "call SP_VALIDARCORREO('$correo');";
    $result_validar = mysqli_query($connection, $validar);
    $contador = mysqli_num_rows($result_validar);

    if($contador >= 1) {
        echo false;
    } else{
        echo true;
    }

    cerrarConexion($connection);

?>