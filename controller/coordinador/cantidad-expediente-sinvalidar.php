<?php
    include("../../Resources/lib/connection.php");

    $rol = $_GET["rol"];
    $estado = $_GET["estado"];

    $sp = "call SP_NUMEROEXPEDIENTESSINREVISAR('$estado', '$rol');";

    $result = mysqli_query($connection, $sp);

    if(!$result){
        echo "Error al obtener dato";
    } else{

        while($row = mysqli_fetch_array($result)){
            $cantidad = $row["estudiantes"];
        }
        echo $cantidad;
    }

    cerrarConexion($connection);
    

?>