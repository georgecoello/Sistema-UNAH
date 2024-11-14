<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar contraseña</title>
    <link rel="stylesheet" href="Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="Resources/css/toastr.css" />
    <link rel="stylesheet" href="Resources/css/login.css" />
    <link rel="stylesheet" href="Resources/css/mis-estilos.css" />
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
                <h4 class='text-light py-3 px-3' style='font-family:helvica;'>Restablecer Contraseña</h4>
            </div>
            
    </div>

    <div class="wrapper fadeInDown centrar">
    <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first mt-3">
        <svg xmlns="/Resources/icon/warn.svg" width="30" height="30" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style="fill:#ff873f;">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
        </svg>
            <h5 class='pt-3 pb-2'> <strong> Restableciendo Contraseña</strong></h5>
        </div>
        <!-- Login Form -->
        <form id="reestablecer">
            <input type="email" id="correo" class="fadeIn second" placeholder="Correo">

            <input type="submit" class="fadeIn fourth" value="Enviar correo" style="background-color:#FFB300;" id="res-btn">
            
        </form>

        <!-- Remind Passowrd -->
        <div id="formFooter">
        <a class="underlineHover" href="index.php">Regresar a Login</a>
        </div>

    </div>
    </div>
    
    


    <script src="Resources/jquery/jquery.min.js"></script>
    <script src="Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="Resources/js/toastr.js"></script>
    <script src="Resources/js/recuperar-pass.js"></script>

</body>

</html>
