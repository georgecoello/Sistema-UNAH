<?php
session_start();
// Check user login or not
if(!isset($_SESSION['id_user'])){
    header('Location: ../../index.php');
} 
if(strcmp($_SESSION['modulo'],'1') !== 0){
    header('Location: ../../index.php');
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión Periodos</title>
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../Resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../Resources/css/simple-sidebar.css">
    <link rel="stylesheet" href="../../Resources/css/toastr.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.min.css">
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


            <div class="sidebar-heading text-center">
                <img src="../../Resources/icon/user1.png" alt="Bootstrap" width="100" height="100" class="mt-3 mb-3 sombra-corta2 rounded-circle">
                <p class="lead text-light" > <small style='font-family:helvica;'> Administrador</small><br>
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
            <div class="container sidebar-content  py-4 " style='background-color:  #000e2bb0 '>
            
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
                                    <small > <strong> Usuarios </strong></small> 
                                </div>   
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a href="gestion-usuarios.php" class="btn btn-warning naranja m-2 col-11 sombra-corta3 btn-sm" id='descarga' role="button" style='border-radius: 5px;'> <small><strong>Ir</strong> </small></a>
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
                                    <small > <strong> Fechas de Entrega </strong></small> 
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
                
                
                
                
                
            </div>
            
            <!-----------------------------FINAL DEL CONTENIDO DEL SIDEBAR-------------------->
            <div class="row "  style='position: fixed; bottom:0px; width: 14.9rem;'>
                <div class="col">
                    <a role="button" href="../../log-out.php" class="btn btn-danger col-12 py-1 salir" style='background-color: #d90429; border-color:#d90429'>
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
                            <a href="../../controller/usuarios/descarga-manual.php" class="btn btn-info btn-sm redondear" role="button">Descargar Manual de Usuario</a>
                        </li>
                        
                    </ul>
                </div>
            </nav>


            <!-----------------------------FIN NAVBAR PARA EL TOGGLE DEL MENU------------------------------------>

            <!-----------------------------------------------CONTENIDO----------------------------------->
            <div class="container px-4 centrar" >
                <div class="container pt-4 pb-2 mt-4 mb-2 fadeInDown" style="border-radius: 5px; background-color: #E8EEF4; box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3); ">

                

                <div class="row align-items-end">
                    <div class="col-1"></div>
                    <div class="col-10">
                        <h3 class="bg-dark text-center " style="border-radius: 5px;"> <p style="color:white; ">Gestión Fechas Entrega Documentos</p></h3>
                    </div>
                    <div class="col-1"></div>
                </div>
                


                
                <!-----------------------------TABLA------------------------------>
                <div class="row ">
                    <div class="col-1"></div>
                    <div class="col-10 text-center">
                        <div class="table-responsive">
                            
                            <table class="table table-sm table-hover table-striped text-center align-self-center table-light " id="example">
                                    
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Fecha Inicio</th>
                                            <th scope="col">Fecha Fin</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody id="usuarios">
                                    </tbody>
                            </table>
                        </div>    
                    </div>
                    <div class="col-1"></div>
                    
                </div>
                <div class="row align-items-end">
                    
                    <div class="col-12">
                        <button type="button" style='border-radius: 5px;' class="btn btn-sm btn-success float-right add-user mt-3 mb-2 sombra-corta3"  data-toggle="modal" data-target="#add-fechas">+ Agregar Nuevo Periodo Entregas</button>          
                    </div>
                    
                </div>
                <!-----------------------------FINAL TABLA------------------------------>
            </div>
            </div>
            
            
            <!-----------------------------FINAL CONTENIDO------------------------------>
        </div>
        <!-----------------------------FINAL CONTENIDO DE LA PAGINA-------------------->
    </div>
        


  <!--------------------------------- MODAL PARA CREAR PERIODO--------------------------->
    <div class="modal fade modal-usuario" id="add-fechas">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title" id="accion-modal">AÑADIR NUEVO PERIODO DE ENTREGAS</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                    <form id="add-periodo-form">
                        
                        <h5>Inicio de Periodo:</h5>
                        <div class="form-row">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-date-input" class="col-2 col-form-label">Fecha:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date"  id="fecha-inicio">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-time-input" class="col-2 col-form-label">Hora:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="time"  id="hora-inicio">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>

                        <h5>Fin de Periodo:</h5>
                        <div class="form-row">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-date-input" class="col-2 col-form-label">Fecha:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date"  id="fecha-fin">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-time-input" class="col-2 col-form-label">Hora:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="time"  id="hora-fin">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>


                        <label for="">Seleccione estado del nuevo periodo de entregas:</label>
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="estado-fecha" checked="">
                                <label class="custom-control-label" for="estado-fecha" id="estado"></label>
                            </div>
                        </div>

                        <br>
                        <div id="boton-modal">
                            <button type="submit" class="text-center btn btn-success btn-block" id='subm-add'>Agregar Periodo</button>
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
    <!--------------------------------- FINAL MODAL PARA CREAR PERIODO--------------------------->

      <!--------------------------------- MODAL PARA EDITAR PERIODO --------------------------->
    <div class="modal fade modal-usuario" id="edit-periodo">
        <div class="modal-dialog">
            <div class="modal-content">
        
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title" >EDITAR PERIODO</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body">
                <form id="edit-periodo-form">
                    <input type="hidden" id="fecha-id">
                        
                        <h5>Inicio de Periodo:</h5>
                        <div class="form-row">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-date-input" class="col-2 col-form-label">Fecha:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date"  id="fecha-inicio1">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-time-input" class="col-2 col-form-label">Hora:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="time"  id="hora-inicio1">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>

                        <h5>Fin de Periodo:</h5>
                        <div class="form-row">
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-date-input" class="col-2 col-form-label">Fecha:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="date"  id="fecha-fin1">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group row">
                                    <label for="example-time-input" class="col-2 col-form-label">Hora:</label>
                                    <div class="col-10">
                                        <input class="form-control" type="time"  id="hora-fin1">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>


                        <label for="">Seleccione estado del periodo de entregas:</label>
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="estado-fecha1" checked="">
                                <label class="custom-control-label" for="estado-fecha1" id="estado1"></label>
                            </div>
                        </div>

                        <br>
                        <div id="boton-modal">
                            <button type="submit" class="text-center btn btn-success btn-block" id='subm-edit'>Editar Periodo</button>
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
    <!--------------------------------- FINAL MODAL PARA EDITAR PERIODO --------------------------->

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
                            <input type="text" id="nombres-datos" placeholder="Nombres" class="form-control" disabled>
                        </div>

                        <div class="form-group">
                            <label for="apellidos">Apellidos:</label>
                            <input type="text" id="apellidos-datos" placeholder="Apellidos" class="form-control" disabled>
                        </div>


                        <div class="form-group">
                            <label for="correo">Correo:</label>
                            <input type="email" id="correo-datos" placeholder="Correo Institucional" class="form-control" disabled>
                        </div>

                        <div class="form-group">
                            <label for="rol">Rol:</label>
                            <input type="text" id="rol" placeholder="Rol" class="form-control" disabled>
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

     <!--MODAL PARA CAMBIO PASSWORS-->
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




    <script src="../../Resources/jquery/jquery.min.js"></script>
    <script src="../../Resources/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../../Resources/js/fecha-entregas.js"></script>
    <script src="../../Resources/js/toastr.js"></script>

    <script type="text/javascript" src="../../Resources/datatables/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="../../Resources/datatables/dataTables.bootstrap4.min.js"></script>
    <script>
        $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        });
    </script>

</body>
</html>
