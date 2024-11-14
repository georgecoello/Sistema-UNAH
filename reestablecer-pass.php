<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer contraseña</title>
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
                <h4 class='text-light py-3 px-3' style='font-family:helvica;'>Cambio de contraseña</h4>
            </div>
            
    </div>

    <div class="wrapper fadeInDown" style="display: flex; align-items: center; justify-content: center; min-height: 80vh;">
    <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
        <h4 class='py-3' > <strong>Cambio de contraseña</strong> </h4>
        </div>
        <!-- Login Form -->
        <form id="reset-password">
            <input type="password" id="password1" class="fadeIn second" placeholder="Nueva Contraseña">
            <input type="password" id="password2" class="fadeIn third"  placeholder="Confirme Contraseña">

            <input type="submit" class="fadeIn fourth" value="Cambiar" style="background-color:#FFB300;" id='cambio'>
            
        </form>

        

    </div>
    </div>
    
    


    <script src="Resources/jquery/jquery.min.js"></script>
    <script src="Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="Resources/js/toastr.js"></script>
    <script src="Resources/js/reestablecer-pass.js"></script>


</body>

</html>
