<?php

    session_start();


    unset($_SESSION['id_user']);
    unset($_SESSION['nombres']);
    unset($_SESSION['apellidos']);
    unset($_SESSION['nombre_rol']);
    unset($_SESSION['id_rol']);
    unset($_SESSION['modulo']);

    session_destroy(); 

    header('Location: index.php');



?>