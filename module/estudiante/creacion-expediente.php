<?php
    session_start();
    // Check user login or not
    if(!isset($_SESSION['id_user'])){
        header('Location: ../../index.php');
    } 
    if(strcmp($_SESSION['modulo'],'3') !== 0){
        header('Location: ../../index.php');
    } 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creación Expediente</title>
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../Resources/css/simple-sidebar.css">
    <link rel="stylesheet" href="../../Resources/css/toastr.css" />
    <link rel="stylesheet" href="../../Resources/css/mis-estilos.css">
    <style> 
        @font-face {
        font-family: helvica;
        src: url(../../Resources/fonts/helvica.ttf);
        }
    </style>
</head>
<body>

    
    <div class="d-flex" id="wrapper">
        <!---------------------------SIDEBAR ---------------------------------------->
        <div class="border-right color-bnav" id="sidebar-wrapper">


            <!-----------------------------ENCABEZADO DEL SIDEBAR-------------------->
            <input type="hidden" id="id-user-session" id-student='<?php echo $_SESSION['id_user'] ?>'>
            <div class="sidebar-heading text-center">
                <img src="../../Resources/icon/ingenieria2.png" width="125" height="125" class="mt-2 mb-3 sombra-corta2 rounded-circle">
                <p class="lead text-light" > <small style='font-family:helvica;'>Estudiante</small><br>
                <small>
                    <?php
                        echo explode(' ',$_SESSION['nombres'])[0].' '. explode(' ',$_SESSION['apellidos'])[0];
                    ?>
                </small>
                </p>
            </div>
            <!-----------------------------FINAL ENCABEZADO DEL SIDEBAR-------------------->
            <div class="container">
                <div class="row" style='background-color: #182B52  ;'>
                    <div class="col text-center ">
                        <small class='lead text-light ' style='font-family:helvica;'>  Menu </small>
                    </div>
                </div>
            </div>
            <!-----------------------------CONTENIDO DEL SIDEBAR-------------------->
            <div class="container sidebar-content  py-3 " style='background-color: #000e2bb0 '>
            
            <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-2 mb-2  text-white text-center col-9" style='border-radius: 5px; background-color: #184e77'> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> 1.Mis datos </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="estado-informacion.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" role="button" style='border-radius: 5px;'> <small><strong>Ir</strong> </small></a>
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-2 mb-2 text-white text-center col-9" style='border-radius: 5px;  background-color: #1e6091'> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> 2.Creación Expediente </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                <a href="#" class="btn btn-warning naranja m-2 col-11 btn-sm sombra-corta3" role="button" id='crear-exp' style='border-radius: 5px;'> <small><strong>Ir</strong> </small></a>
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-2 mb-2 text-white text-center col-9" style='border-radius: 5px; background-color: #1a759f '> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> 3.Estado Expediente </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="estado-expediente.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm disabled" id='estado-exp' role="button" style='border-radius: 5px;'> <small><strong>Ir</strong> </small></a>                                   
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-1 mb-2 text-white text-center col-9" style='border-radius: 5px; background-color: #168aad'> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> 4.Fecha Cita</strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="cita.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm disabled" id='cita-estudiante' role="button" style='border-radius: 5px;'> <small><strong>Ir</strong> </small></a>
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-1 mb-2 text-white text-center col-9" style='border-radius: 5px; background-color: #168aad'> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> 5.Descarga Constancia</strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="descarga-constancia.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm disabled" id='descarga' role="button" style='border-radius: 5px;'> <small><strong>Ir</strong> </small></a>
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                
                
                
                
                
                
            </div>
            
            <!-----------------------------FINAL DEL CONTENIDO DEL SIDEBAR-------------------->
            <div class="row "  style='position: fixed; bottom:0px; width: 14.9rem;'>
                <div class="col">
                    <a role="button" href="../../log-out.php" class="btn btn-danger col-12 py-1 btn-salir">
                        <svg xmlns="../../Resources/icon/back.svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <small> Salir </small>
                    </a>
                </div>
            </div>
        </div>
        <!-----------------------------FINAL DEL SIDEBAR-------------------->
        
        
        <!-----------------------------CONTENIDO DE LA PAGINA-------------------->
        <div id="page-content-wrapper">
            <!-----------------------------NAVBAR PARA EL TOGGLE DEL MENU (SOLO DISPOSITIVOS)-------------------->
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom " >
                <button class="btn btn-primary color-bnav " id="menu-toggle" style='font-family:helvica; border-radius: 5px;'>
                    <svg xmlns="../../Resources/icon/list.svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                     Menu
                </button>
                
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <h4>Sistema de Gestión de Expedientes de Graduación</h4>
                        </li>
                        
                    </ul>
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a href="../../controller/estudiante/descarga-manual.php" class="btn btn-info btn-sm redondear" role="button">Descargar Manual de Usuario</a>
                        </li>
                        
                    </ul>
                </div>
            </nav>
            <nav class="text-center text-muted" style="background-color: #E8EEF4; ">
                <svg xmlns="/Resources/icon/warn.svg" width="15" height="15" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style="fill:#ff873f;">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                </svg>
                
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
                                echo "Tiene desde el $inicio hasta el $fin (GMT-6), para gestionar su expediente, después de esas fechas no podrá seguir gestionando su expediente.";
                            } else {
                                echo "Actualmente no se están gestionando expedientes de graduación. Podrá continuar con la gestión de su expediente cuando se inicie un nuevo periodo de recepción de expedientes.";
                                die();
                            }

                        }else {
                            echo "Actualmente no se están gestionando expedientes de graduación. Podrá continuar con la gestión de su expediente cuando se inicie un nuevo periodo de recepción de expedientes.";
                            die();
                        }

                    ?>
                
                <svg xmlns="/Resources/icon/warn.svg" width="15" height="15" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style="fill:#ff873f;">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                </svg>
            </nav>


            <!-----------------------------FIN NAVBAR PARA EL TOGGLE DEL MENU------------------------------------>

            <!-----------------------------------------------CONTENIDO----------------------------------->
            
            <div class="container px-4 centrar" >
                <div class="container pt-3 pb-1 mt-4 mb-4 fadeInDown sombra redondear" style="background-color: #E8EEF4; ">


                    <input type="text" id="id-estudiante" placeholder="" class="form-control" hidden>
                    <input type="text" id="cuenta-estudiante" placeholder="" class="form-control" hidden>
                    <input type="text" id="carrera-estudiante" placeholder="" class="form-control" hidden>

                    <div class="row align-items-end pt-2">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <h3 class="bg-dark text-center " style="border-radius: 5px;"> <p style="color:white;">Documentos Necesarios</p></h3>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row align-items-end">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-12"><h5 class='text-muted'></h5></div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-12"><h5 class='float-right text-danger'> <small> El tamaño de cada archivo no debe de exceder los 5Mb.</small></h5></div>
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div> 

                    <div class="row pt-2">
                        <div class="col-1"></div>
                        <div class="col-10 text-center">
                            <div class="table-responsive">
                                
                                <table class="table table-striped table-hover text-center align-self-center table-light" id="example">
                                        
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Nombre Documento y Formato</th>
                                                <th scope="col">Enlace Subida</th>
                                                <th scope="col">Subir</th>
                                                <th scope="col">Estado</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr codigo='1'>
                                                <td> <small> Constancia de Verificación de Nombre (Fotofgrafía Ovalada Pegada) <br> (.pdf) </small></td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-1' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='2'>
                                                <td> <small>Copia de DNI (ambos lados) <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-2' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            
                                            <tr codigo='3'>
                                                <td> <small> Certificación de Calificaciones <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-4' class="badge badge-danger">Sin subir</span>   
                                                </td>
                                            </tr>
                                            
                                            <tr codigo='4'>
                                                <td> <small> Constancia de Trabajo Social Comunitario <br>Emitidad por VOAE <br> (.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-4' class="badge badge-danger">Sin subir</span>   
                                                </td>
                                            </tr>

                                            <tr codigo='5'>
                                                <td> <small> Constancia de Práctica Profesional Laboral<br>(.pdf)</small></td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-6' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='6'>
                                                <td> <small>Solicitud de realización del Examen del Himno Nacional y su Aprobación <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-7' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='7'>
                                                <td> <small>Solicitud de Extensión de Título<br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-8' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            
                                            <tr codigo='8'>
                                                <td> <small>Fotocopia de Título de Educación Media (ambos lados)<br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-8' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>

                                            <tr codigo='9'>
                                                <td> <small> Boleta por Pago de Carnet L 30.00 <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-10' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='10'>
                                                <td> <small> Boleta de Pago de Trámites de Graduación<br> L.4,000.00 <br>(.pdf)</small></td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-11' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='11'>
                                                <td> <small>Boleta de pago de entrega de Título por Ventanilla <br> L. 2,500.00 <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-12' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='12'>
                                                <td> <small>Solvencia de Registro <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-13' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='13'>
                                                <td> <small>Foto Ovalada (1) <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-14' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            <tr codigo='14'>
                                                <td> <small>Timbre de Contratación L. 100.00 <br> (.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-15' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>
                                            
                                            <tr codigo='15' class='docs-excelencia' hidden>

                                                <td> <small>Constancia de Conducta y Mención Honorífica firmada por Coordinador <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-17' class="badge badge-success">Sin subir</span>
                                                </td>
                                            </tr>
                                            
                                            <tr codigo='16' class='docs-excelencia'>
                                                <td> <small>Justificación de Mención Honorífica <br>(.pdf)</small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-18' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>

                                            <tr codigo='17' class='docs-excelencia'>
                                                <td> <small> <div class="text-center"> Solicitud de Honores Académicos <br> </div><br><div style="text-align: left"><ul id='lista-otros'></ul></div></small> </td>
                                                <td class='doc-estudiante'>
                                                    <input type="file" class="form-control-file doc" aria-describedby="fileHelp">
                                                </td>
                                                <td>
                                                    <button class="btn btn-info btn-sm subir">Subir</button>
                                                </td>
                                                <td>
                                                    <span id='sub-doc-16' class="badge badge-danger">Sin subir</span>
                                                </td>
                                            </tr>

                                        </tbody>
                                </table>
                                

                            </div>    
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <div class="row pb-3">
                        <div class="col-4"></div>
                        <div class="col-4">
                            <button type="button" style='border-radius: 5px;' class="btn btn-sm btn-success float-right add-user mt-3 mb-2 sombra-corta3 btn-block" id='enviar' disabled>Enviar Todo</button>          
                        </div>
                        <div class="col-4"></div>
                    
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <p class='text-center'><small class='text-muted'>Una vez todos los documentos sean subidos, se habilitará el botón para enviar todos los documentos para que el coordinador de su carrera 
                            pueda validar el estado de estos.</small></p>
                        </div>
                        <div class="col-1"></div>
                </div>

                </div>
            </div>
            <!-----------------------------FINAL CONTENIDO------------------------------>
    </div>
    <!-----------------------------FINAL CONTENIDO DE LA PAGINA-------------------->


    


    <script src="../../Resources/jquery/jquery.min.js"></script>
    <script src="../../Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../../Resources/js/toastr.js"></script>
    <script src="../../Resources/js/creacion-expediente.js"></script>


    <script>
        $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        });
    </script>

</body>
</html>
