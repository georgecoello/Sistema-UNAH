<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../Resources/css/toastr.css" />
    <link rel="stylesheet" href="../../Resources/css/registro-estudiante.css" />

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
    </div>

    <div class="container my-3" >
        <div class="row text-center" style="display: flex; align-items: center; justify-content: center; min-height: 70vh;">
            <div class="col-2"></div>
            <div class="col-8 py-3 px-4 fadeInDown" style='background-color: #ffffff; border-radius: 5px; box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);'>
                <svg xmlns="../../Resources/icon/check-circle.svg" width="40" height="40" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16" style="fill:#6AE96B;">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
                <h2>¡Se ha creado su usuario exitosamente!</h2>
                <h5 class="pb-3">Se ha enviado a su correo institucional un código para la verificación de su correo (Puede que el correo haya caído en correos no deseados). Ingrese al sistema desde la pagina de login, una vez dentro por favor ingresar código de verificación</h5>
                <a href="../../" >Regresar a login</a>

            </div>
            <div class="col-2"></div>
        </div>
    </div>


    <script src="../../Resources/jquery/jquery.min.js"></script>
    <script src="../../Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../../Resources/js/toastr.js"></script>


</body>
</html>
