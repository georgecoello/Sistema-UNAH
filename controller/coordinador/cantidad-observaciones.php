<?php
    include("../../Resources/lib/connection.php");

    $rol = $_GET["rol"];

    $sp = "call SP_NUMEROBSERVACIONES('$rol');";

    $result = mysqli_query($connection, $sp);

    if(!$result){
        echo "Error al obtener dato";
    } else{

        while($row = mysqli_fetch_array($result)){
            $cantidad = $row["comentarios"];
        }
        echo $cantidad;
    }

    cerrarConexion($connection);
    

?>