<?php
    include("../../Resources/lib/connection.php");

    $rol = $_GET["rol"];

    $sp = "call SP_NUMEROCITAS('$rol');";

    $result = mysqli_query($connection, $sp);

    if(!$result){
        echo "Error al obtener dato";
    } else{

        while($row = mysqli_fetch_array($result)){
            $cantidad = $row["citas"];
        }
        echo $cantidad;
    }

    cerrarConexion($connection);
    

?>