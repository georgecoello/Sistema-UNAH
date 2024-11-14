<?php

    session_start();

    $id = $_POST["id"];
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $nombre_rol = $_POST["nombre_rol"];
    $id_rol = $_POST["rol"];
    $modulo = $_POST["modulo"];

    $_SESSION['id_user'] = $id;
    $_SESSION['nombres'] = $nombres;
    $_SESSION['apellidos'] = $apellidos;
    $_SESSION['nombre_rol'] = $nombre_rol;
    $_SESSION['id_rol'] = $id_rol;
    $_SESSION['modulo'] = $modulo;

    echo $modulo;


?>