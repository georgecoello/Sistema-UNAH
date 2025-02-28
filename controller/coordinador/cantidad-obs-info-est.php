<?php
include("../../Resources/lib/connection.php");

// Prepara la llamada al procedimiento almacenado
$sp = "CALL SP_NUMCOMINFO();"; // Llamada sin parámetros
$result = mysqli_query($connection, $sp);

if (!$result) {
    // Si hay un error en la consulta, devuelve un mensaje de error
    echo "Problema al ejecutar la consulta: " . mysqli_error($connection);
    exit;
}

// Obtiene la fila de resultados
$row = mysqli_fetch_assoc($result);

// Verifica si la fila contiene la columna "comentarios"
if ($row && isset($row["comentarios"])) {
    $cantidad = intval($row["comentarios"]); // Asegúrate de que sea un número
    echo $cantidad;
} else {
    echo "0"; // Si no hay resultados, devuelve 0
}

// Cierra la conexión
cerrarConexion($connection);
?>