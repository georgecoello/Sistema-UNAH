<?php
     include("../../Resources/lib/connection.php");
     date_default_timezone_set("America/Tegucigalpa");

     $sp = "call SP_OBTENERPERIODOENTREGA();";
     $query = mysqli_query($connection, $sp);
     $contador = mysqli_num_rows($query);

     if($contador >= 1) {
         
         while($row = mysqli_fetch_array($query)){
             $inicio = $row["fecha_inicio"];
             $fin = $row["fecha_fin"];
         }

         $fecha_inicio = strtotime($inicio);
         $fecha_fin = strtotime($fin);
         
         $hoy = strtotime(date("Y-m-d H:i:00",time()));

         
         if ( $fecha_inicio < $hoy && $hoy < $fecha_fin ){

         } else {
            header('Location: ../../index.php');
         }

     }else {
        header('Location: ../../index.php');
     }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Estudiante</title>
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../Resources/css/toastr.css" />
    <link rel="stylesheet" href="../../Resources/css/registro-estudiante.css" />
    <link rel="stylesheet" href="../../Resources/css/mis-estilos.css" />

    <style> 
        @font-face {
        font-family: helvica;
        src: url(../../Resources/fonts/helvica.ttf);
        }

</style>
</head>


<body style='background-color:#E5F3FF;'>
    
    <div class="d-flex justify-content-between align-items-center" style='background-color: #20396e ;'>
            <div>
                <h4 class='text-light py-3 px-3' style='font-family:helvica;'>Registro Estudiante</h4>
            </div>
            <div>
                <a class="btn btn-primary py-2 mx-3 btn-menu" href="../../" role="button">
                    <svg xmlns="../../Resources/icon/back.svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
                </a>
            </div>
    </div>


    <div class="container my-3">
        <div class="row centrar">
            <div class="col-2"></div>
            <div class="col-8 py-3 px-4 fadeInDown sombra" style='background-color: #ffffff; border-radius: 5px;'>
                <div class="row pb-2">
                    <div class="col text-center">
                        <h2> <strong> Formulario Estudiante </strong></h2>
                        <hr>
                    </div>  
                </div>
                <div class="row">
                    <div class="col">
                        <form id="add-student">
                            <div class="form-row">
                                <div class="col-xl-5 col-lg-5 col">
                                    <div class="form-group">
                                        <label for="nombres">Nombres:</label>
                                        <input type="text" id="nombres" placeholder="Nombres" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="apellidos">Apellidos:</label>
                                        <input type="text" id="apellidos" placeholder="Apellidos" class="form-control">
                                        <p class="help-block"> <small class="text-warning">Acentúa tus nombres y apellidos, esto evitara problemas al momento de revisar
                                            tu documentación.
                                        </small></p>
                                    </div>
                                    <div class="form-group">
                                        <label for="identidad">Numero Identidad:</label>
                                        <input type="text" id="identidad" placeholder="Numero Identidad" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="password1">Ingrese contraseña: </label>
                                        <input type="password" class="form-control" id="password1" placeholder="Password">
                                    </div>
                                    <div class="form-group">
                                        <label for="password2">Ingrese nuevamente contraseña:</label>
                                        <input type="password" class="form-control" id="password2" placeholder="Password">
                                    </div>
                                </div>
                                <div class='vl col-xl-2 col-lg-2'></div>
                                <div class="col-xl-5 col-lg-5 col">
                                    <div class="form-group">
                                        <label for="correo">Correo Institucional:</label>
                                        <input type="email" id="correo" placeholder="Correo Institucional" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="numero-cuenta">Numero de Cuenta:</label>
                                        <input type="text" id="numero-cuenta" placeholder="Numero de Cuenta" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleSelect1">Seleccione carrera: </label>
                                        <select class="form-control" id="carrera">
                                            
                                        </select>
                                    </div>
                                    <label for="">¿Pertenece usted a excelencia académica?</label>
                                    <div class="form-group">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="estado-excelencia" checked="">
                                            <label class="custom-control-label" for="estado-excelencia" id="estado"></label>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="form-row justify-content-end">
                                        <div class="col">
                                            <button type="submit" style='border-radius: 5px;' class="text-center btn btn-success btn-block sombra-corta" id="subm">Crear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>


    <script src="../../Resources/jquery/jquery.min.js"></script>
    <script src="../../Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../../Resources/js/toastr.js"></script>
    <script src="../../Resources/js/formulario-estudiante.js"></script>

</body>
</html>
