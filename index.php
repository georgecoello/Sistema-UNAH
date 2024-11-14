<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn</title>
    <link rel="stylesheet" href="Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="Resources/css/toastr.css" />
    <link rel="stylesheet" href="Resources/css/login.css" />
    <style> 
        @font-face {
        font-family: helvica;
        src: url(Resources/fonts/helvica.ttf);
        }
    </style>

</head>


<body style='background-color:#E5F3FF;'>
    
    <div class="d-flex justify-content-between align-items-center" style='background-color: #20396e ;'>
            <div>
                <h4 class='text-light py-3 px-3' style='font-family:helvica;'>Gestión de Expedientes de Graduación (UNAH-CU)</h4>
            </div>
            
            
                <?php
                    include("Resources/lib/connection.php");
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

                            $boton = "
                            <div class='d-flex justify-content-between align-items-center'>
                                <p class='my-3 mx-3 text-white align-self-righ d-none d-sm-block' style='margin-left: auto;'>Tiene desde el $inicio hasta el $fin (GMT-6), para gestionar su expediente.</p>
                                <a class='btn btn-primary btn-menu py-2 mx-3' href='module/estudiante/registro-estudiante.php' role='button' >REGISTRO ESTUDIANTE</a>
                            </div>";
                            echo $boton;

                        } else {
                            echo '
                            <div>
                                <p class="my-3 mx-3 text-white">Actualmente no se están gestionando expedientes de graduación.</p>
                            </div>';
                        }

                    }else {
                        echo '
                        <div>
                            <p class="my-3 mx-3 text-white">Actualmente no se están gestionando expedientes de graduación.</p>
                        </div>';
                    }

                    
                
                ?>
                
            
    </div>

    <div class="wrapper fadeInDown" style="display: flex; align-items: center; justify-content: center; min-height: 80vh;">
    <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
        <img src="Resources/icon/Ingenieria.png" id="icon" alt="User Icon" />
        </div>
        <!-- Login Form -->
        <form id="login-form">
            <input type="email" id="correo" class="fadeIn second" placeholder="Correo">
            <input type="password" id="password" class="fadeIn third"  placeholder="Contraseña">

            <input type="submit" class="fadeIn fourth" value="Iniciar Sesión" id='entrar' style="background-color:#fdc300;">
            
        </form>

        <!-- Remind Passowrd -->
        <div id="formFooter">
        <a class="underlineHover" href="recuperar-password.php">¿Ha olvidado la contraseña?</a>
        </div>

    </div>
    </div>
    
    


    <script src="Resources/jquery/jquery.min.js"></script>
    <script src="Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="Resources/js/toastr.js"></script>
    <script src="Resources/js/login.js"></script>

</body>

</html>
