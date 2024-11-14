<?php
session_start();
// Check user login or not
if(!isset($_SESSION['id_user'])){
    header('Location: ../../index.php');
} 
if(strcmp($_SESSION['modulo'],'2') !== 0){
    header('Location: ../../index.php');
} 

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expediente Repetido</title>
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../Resources/css/simple-sidebar.css">
    <link rel="stylesheet" href="../../Resources/css/toastr.css" />
    <link rel="stylesheet" href="../../Resources/css/registro-estudiante.css">
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

            <input type="hidden" id="id_user_act" id_user='<?php echo $_SESSION['id_user'] ?>'>
            <input type="hidden" id="coor-rol" rol='<?php echo $_SESSION['id_rol'] ?>'>
            <input type="hidden" id="coor-nombre" nombre='<?php echo $_SESSION['nombres'] ?>'>
            <input type="hidden" id="coor-apellido" apellido='<?php echo $_SESSION['apellidos'] ?>'>
            <input type="hidden" id="estado-expediente" estado='2'>
            <input type="hidden" id="estudiante-id" id_estudiante='<?php echo $_GET["id"]; ?>'>
            <input type="hidden" id="estudiante-excelencia" excelencia='<?php echo $_GET["excelencia"]; ?>'>
            <input type="hidden" id="estudiante-solicitud" solicitud='<?php echo $_GET["solicitud"]; ?>'>
            <input type="hidden" id="estudiante-correo" correo='<?php echo $_GET["correo"]; ?>'>


            <div class="sidebar-heading text-center">
                <img src="../../Resources/icon/user1.png" alt="Bootstrap" width="100" height="100" class="mt-3 mb-3 sombra-corta2 rounded-circle">
                <p class="lead text-light" > <small style='font-family:helvica;'>Coordinador</small><br>
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
            <div class="container sidebar-content  py-4 " style='background-color:#000e2bb0 '>
            
            <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-2 mb-2  text-white text-center col-9" style='border-radius: 5px; background-color: #184e77'> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> Mis datos </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="#" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" role="button" style='border-radius: 5px;' data-toggle="modal" data-target="#mis-datos"> <small><strong> Ver</strong> </small></a>
                                </div>
                                <div class="col">
                                    <a href="#" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" role="button" style='border-radius: 5px;' data-toggle="modal" data-target="#cambio-pass"> <small><strong> Cambio Contraseña</strong> </small></a>
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
                                    <small > <strong> Estudiantes </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="validar-info-estudiante.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" role="button" style='border-radius: 5px;'> <small><strong>Validar información Nuevos</strong> </small></a>
                                </div>
                                <div class="col">
                                    <a href="validar-info-estudiante-repetido.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" role="button" style='border-radius: 5px;'> <small><strong> Validar información Repetidos</strong> </small></a>
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
                                    <small > <strong> Expedientes </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="otros-documentos.php" class="btn btn-warning btn-sm naranja m-2 col-11 sombra-corta3" role="button" style='border-radius: 5px;'> <small><strong>Otros Documentos</strong> </small></a>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col">
                                    <a href="revisar-expediente.php" class="btn btn-warning naranja m-2 col-11 btn-sm sombra-corta3" role="button" style='border-radius: 5px;'> <small><strong>Solicitudes nuevas</strong> </small></a>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col">
                                    <a href="revisar-expediente-repetido.php" class="btn btn-warning btn-sm naranja m-2 col-11 sombra-corta3" role="button" style='border-radius: 5px;'> <small><strong>Solicitudes repetidas</strong> </small></a>
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-2 mb-2 text-white text-center col-9" style='border-radius: 5px; background-color: #168aad '> 
                        <div class="row">
                                <div class="col">
                                    <small > <strong> Citas </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="citas.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" role="button" style='border-radius: 5px;'> <small><strong>Ver citas</strong> </small></a>
                                </div>
                            </div> 
                        </div>
                    <div class="col-1"></div>
                </div>
                <div class="row text-center">
                    <div class="col-1"></div>
                        <div class="pt-1 pb-2 mb-2 text-white text-center col-9" style='border-radius: 5px; background-color: #199cc3'> 
                            <div class="row">
                                <div class="col">
                                    <small > <strong> Constancia Egresado </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="subir-constancia.php" class="btn btn-warning naranja m-2 col-11 btn-sm sombra-corta3" role="button" style='border-radius: 5px;'> <small><strong>Subir Constancias</strong> </small></a>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col">
                                    <a href="constancia-subida.php" class="btn btn-warning naranja m-2 col-11 btn-sm sombra-corta3" role="button" style='border-radius: 5px;'> <small><strong>Subidas</strong> </small></a>
                                </div>
                            </div>
                        </div>
                    <div class="col-1"></div>
                </div>
                
                
                
                
                
                
            </div>
            
            <!-----------------------------FINAL DEL CONTENIDO DEL SIDEBAR-------------------->
            <div class="row "  style='position: fixed; bottom:0px; width: 14.9rem;'>
                <div class="col">
                    <a role="button" href="../../log-out.php" class="btn btn-danger col-12 py-1 btn-salir" >
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
                            <h5>Sistema de Gestión de Expedientes de Graduación</h5>
                        </li>
                        
                    </ul>
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a href="../../controller/coordinador/descarga-manual.php" class="btn btn-info btn-sm redondear" role="button">Descargar Manual de Usuario</a>
                        </li>
                        
                    </ul>
                </div>
            </nav>


            <!-----------------------------FIN NAVBAR PARA EL TOGGLE DEL MENU------------------------------------>

            <!-----------------------------------------------CONTENIDO----------------------------------->
            <div class="container px-4 centrar" >


                <div class="container pt-4 pb-2 mt-4 mb-2 fadeInDown"  style="border-radius: 5px; background-color: #E8EEF4; box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3); ">

                    <div class="row align-items-end">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <div class="row">
                                <div class="col-9"></div>
                                <div class="col-3"> 
                                    <a href="../../controller/coordinador/descargar-todozip.php?id=<?php echo $_GET["id"]; ?>&cuenta=<?php echo $_GET["cuenta"]; ?>" class="btn btn-sm btn-info mb-3 btn-block redondear" role="button" download="">Descargar Todo (.zip)</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div>


                    <div class="row align-items-end">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <h3 class="bg-dark text-center " style="border-radius: 5px;"> <p style="color:white;" id='numero-expedientes'>Expediente Alumno </p></h3>
                        </div>
                        <div class="col-1"></div>
                    </div>  

                    <div class="row align-items-end">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-12"><h5 class='text-muted'>Nombre: <?php echo $_GET["nombre"]; ?></h5></div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-12"><h5 class='float-right text-muted'>Cuenta: <?php echo $_GET["cuenta"]; ?></h5></div>
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div> 

                    <div class="row pt-2">
                        <div class="col-1"></div>
                        <div class="col-10 text-center">
                            <div class="table-responsive">
                                
                            <table class="table table-hover table-striped text-center align-self-center table-light" id="example">
                                        
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Nombre Documento y Formato</th>
                                                <th scope="col">Descarga</th>
                                                <th scope="col">¿Valido?</th>
                                                <th scope="col">Descripción</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr codigo='1'>
                                                <td> <small class="nombre-doc"> Constancia de Verificación de Nombre <br> (.pdf) </small></td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-1' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-1' target="_blank">Ver</a>
                                            
                                                </td>
                                                <td id='doc-val-1'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-1" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='2'>
                                                <td> <small class="nombre-doc">Copia de Identidad, derecho y reverso en la misma pagina <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-2' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-2' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-2'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-2" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='3' hidden>
                                                <td> <small class="nombre-doc">Certificación de calificaciones original (Oficina de Registro)<br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-3' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-3' target="_blank">Ver</a>

                                                </td>
                                                <td id='doc-val-3'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-3" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='4'>
                                                <td> <small class="nombre-doc"> Constancia de horas refrendada por la VOAE <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-4' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-4' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-4'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-4" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='5' hidden>
                                                <td> <small class="nombre-doc">  Constancia de Solvencia de biblioteca <br>(.pdf) </small></td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-5' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-5' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-5'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-5" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='6'>
                                                <td> <small class="nombre-doc"> Constancia Finalización de Práctica Profesional <br>(.pdf)</small></td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-6' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-6' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-6'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-6" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='7'>
                                                <td> <small class="nombre-doc">Solicitud de realización del examen del Himno Nacional y su aprobación <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-7' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-7' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-7'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-7" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='8'>
                                                <td> <small class="nombre-doc">Solicitud de extensión de títulos a la secretaría general<br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-8' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-8' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-8'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-8" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='9' hidden>
                                                <td> <small class="nombre-doc"> Constancia de Unidades Valorativas <br>(.pdf)</small></td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-9' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-9' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-9'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-9" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='10'>
                                                <td> <small class="nombre-doc"> Titulo secundaria, copia revés y derecho <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-10' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-10' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-10'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-10" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='11'>
                                                <td> <small class="nombre-doc"> Boleta de Pago derechos de Graduación De Licenciatura <br> (L.4000.00, código de pago 303) <br>(.pdf)</small></td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-11' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-11' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-11'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-11" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='12'>
                                                <td> <small class="nombre-doc">Boleta de pago de carnet (L.30, código de pago 202) <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-12' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-12' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-12'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-12" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='13'>
                                                <td> <small class="nombre-doc">Timbre de L100.00 Banco de Occidente <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-13' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-13' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-13'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-13" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='14'>
                                                <td> <small class="nombre-doc">2 fotos Ovales B/N con traje formal, 2 fotos tamaño carné a color <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-14' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-14' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-14'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-14" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='15'>
                                                <td> <small class="nombre-doc">Solvencia de Registro<br> (.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-15' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-15' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-15'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-15" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='16'>
                                            <td> <small class="nombre-doc"> Otros:<br><div style="text-align: left"><ul id='lista-otros'></ul></div></small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-16' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-16' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-16'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-16" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='17' class='docs-excelencia' hidden>
                                                <td> <small class="nombre-doc">Constancia de Conducta <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-17' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-17' target="_blank">Ver</a>
                                                </td>
                                                <td id='doc-val-17'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-17" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            <tr codigo='18' class='docs-excelencia'>
                                                <td> <small class="nombre-doc">Formulario para extensión honores académicos <br>(.pdf)</small> </td>
                                                <td>
                                                    <a href="#" class="btn btn-info btn-sm" role="button" id='btn-descarga-18' download="">Descargar</a>
                                                    <a href="#" class="btn btn-secondary btn-sm" role="button" id='btn-ver-18' target="_blank">Ver</a>

                                                </td>
                                                <td id='doc-val-18'>
                                                    <button class="btn btn-success btn-sm si">Si</button>
                                                    <button class="btn btn-danger btn-sm no">No</button>
                                                </td>
                                                <td>
                                                    <textarea class="form-control" id="comentario-18" rows="2" disabled></textarea>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                </table>
                                

                            </div>    
                        </div>
                    </div>

                    
                        <div class="col-1"></div>

                        <div class="row pb-3">
                            <div class="col-4"></div>
                            <div class="col-4">
                                <button type="button" style='border-radius: 5px;' class="btn btn-sm btn-success mt-3 mb-2 sombra-corta3 btn-block" id='enviar' hidden>Validar</button>    
                                <button type="button" style='border-radius: 5px;' class="btn btn-sm btn-warning mt-3 mb-2 sombra-corta3 btn-block" id='enviar-rectificar' hidden>Enviar Rectificar</button>      
                            </div>
                            <div class="col-4"></div>
                        </div>


                        <div class="row">
                            <div class="col-1"></div>
                            <div class="col-10">
                                <p class='text-center'><small class='text-muted'>Una vez se hayan revisado todos los documentos se habilitara el botón para la verificación de la solicitud de todos los 
                                documentos.</small></p>
                            </div>
                            <div class="col-1"></div>
                        </div>
                    
                
                
                


            </div>

            
            
            <!-----------------------------FINAL CONTENIDO------------------------------>
        </div>
        <!-----------------------------FINAL CONTENIDO DE LA PAGINA-------------------->
    </div>


    <!--MODAL PARA MOSTRAR DATOS DEL USUARIO-->
    <div class="modal fade modal-usuario" id="mis-datos">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title" >MIS DATOS</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <form id="mostrar-mis-datos">


                        <div class="form-group">
                            <label for="nombres">Nombres:</label>
                            <input type="text" id="nombres-datos" placeholder="Nombres" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="apellidos">Apellidos:</label>
                            <input type="text" id="apellidos-datos" placeholder="Apellidos" class="form-control">
                        </div>


                        <div class="form-group">
                            <label for="correo">Correo:</label>
                            <input type="email" id="correo-datos" placeholder="Correo Institucional" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="rol">Rol:</label>
                            <input type="text" id="rol" placeholder="Rol" class="form-control">
                        </div>

                        
                    </form>
                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer">

                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Cerrar</button>
                </div>
        
            </div>
        </div>
    </div>
    <!--FIN MODAL-->

     <!--MODAL PARA CAMBIO PASSWORDS-->
     <div class="modal fade modal-usuario" id="cambio-pass">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title" >CAMBIO DE CONTRASEÑA</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <form id="cambio-pass-user">

                    

                        <div class="form-group">
                            <label for="pass1">Introduzca contraseña actual:</label>
                            <input type="password" id="pass-act" placeholder="contraseña actual" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="pass1">Introduzca nueva contraseña:</label>
                            <input type="password" id="pass1" placeholder="Nueva contraseña" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="pass2">Confirmar nueva contraseña:</label>
                            <input type="password" id="pass2" placeholder="Confirmar contraseña:" class="form-control">
                        </div>

                        <br>

                        <div id="boton-modal">
                            <div class="row justify-content-center">
                                <div class="col-6">
                                    <button type="button" class="btn btn-warning btn-block" id='cambiar-pass'>Cambiar Contraseña</button>
                                </div>
                            </div>
                        </div>

                        
                    </form>
                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer">

                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Cancelar</button>
                </div>
        
            </div>
        </div>
    </div>
    <!--FIN MODAL-->



    <!--MODAL PARA VALIDAR DOCUMENTO-->
    <div class="modal fade modal-si" id="modal-si">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title" >Validar</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <input type="hidden" id="codigo-doc-si">
                    <p>¿Esta seguro que desea validar el Documento?:</p>
                    <p id="text-modal-si" class='text-center'></p>
                </div>
        
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id='validar-doc-si' data-dismiss="modal">Validar</button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Cerrar</button>
                </div>
        
            </div>
        </div>
    </div>
    <!--FIN MODAL-->

    <!--MODAL PARA VALIDAR DOCUMENTO-->
    <div class="modal fade modal-no" id="modal-no">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title" >Invalidar</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <input type="hidden" id="codigo-doc-no">
                    <p>Describa la razón por la cual es invalido el documento:</p>
                    <p id="text-modal-no" class='text-center'></p>
                    <textarea class="form-control" id="descripcion-no" rows="3"></textarea>
                </div>

                
        
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning btn-sm" id='validar-doc-no'>Enviar a rectificar</button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Cerrar</button>
                </div>
        
            </div>
        </div>
    </div>
    <!--FIN MODAL-->

    <!--MODAL PARA CREAR CITA-->
    <div class="modal fade modal-usuario" id="aprobar-cita">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" >APROBAR Y CREAR CITA</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">

                    <div class="form-group row">
                        <label for="example-date-input" class="col-2 col-form-label">Fecha:</label>
                        <div class="col-10">
                            <input class="form-control" type="date"  id="fecha-cita">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-9"></div>
                        <div class="col-3">
                            <button type="button" class="btn btn-info btn-block btn-sm mb-2" id="ver-horas">Ver horas</button>
                        </div>
                    </div>  
                    

                    <div class="container mb-3"  style="border-radius: 5px; background-color: #E8EEF4;">
                        <div class="row" id="horas">
                            
                        </div>
                    </div>

                    <div class="container mb-3"  style="border-radius: 5px; background-color: #E8EEF4;">
                        <div class="row">
                            <div class="col text-center" id="sin-horas"></div>
                        </div>
                    </div>


                    <div class="form-group row">
                        <label for="example-time-input" class="col-2 col-form-label">Hora:</label>
                        <div class="col-10">
                            <input class="form-control" type="time"  id="hora-cita">
                        </div>
                    </div>

                    <div class=" row">
                        <div class="col-2"></div>
                        <div class="col-8">
                            <button type="button" class="btn btn-success btn-block" id="enviar-validar-cita">Validar y crear cita</button>
                        </div>
                        <div class="col-2"></div>
                    </div>  
                </div>
                
                
        
                <!-- Modal footer -->
                <div class="modal-footer">
                    <a href="../../controller/coordinador/descargar-todozip.php?id=<?php echo $_GET["id"]; ?>&cuenta=<?php echo $_GET["cuenta"]; ?>" class="btn btn-sm btn-info" role="button" download="">Descargar Todo (.zip)</a>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Cancelar</button>
                    
                </div>
        
            </div>
        </div>
    </div>


    <script src="../../Resources/jquery/jquery.min.js"></script>
    <script src="../../Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../../Resources/js/toastr.js"></script>
    <script src="../../Resources/js/responsive-paginate.js"></script>
    <script src="../../Resources/js/expediente-estudiante-repetido.js"></script>



    <script>
        $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        });
    </script>

</body>
</html>
