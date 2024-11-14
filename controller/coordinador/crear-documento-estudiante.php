<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

    if (!empty($_POST["estudiante"]) && !empty($_POST["coordinador"]) && !empty($_POST["carrera"]) && !empty($_POST["cuenta"]) && !empty($_POST["excelencia"]) && !empty($_POST["id"]) && !empty($_POST["rol_coordinador"])){

        $estudiante = $_POST["estudiante"];
        $coordinador = $_POST["coordinador"];
        $carrera = $_POST["carrera"];
        $cuenta = $_POST["cuenta"];
        $excelencia = $_POST["excelencia"];
        $id = $_POST["id"];
        $rol_coor = $_POST["rol_coordinador"];
    
        $nombre_est = str_replace(' ','',$estudiante);
        
        $nombre_carpeta=$id."_".$nombre_est;        //NOMBRE QUE TENDRA LA CARPETA QUE TENDRA LOS ARCHIVOS DE DESCARGA DEL ESTUDIANTE
        $ruta = "";     //RUTA BASE DE DONDE SE ALMACENARAN LOS ARCHIVOS DE DESCARGA DEL ESTUDIANTE
       
        $ruta_solicitud = ""; //RUTA DONDE SE ALMACENARAN TODOS LOS ARCHIVOS CUANDO EL ESTUDIANTE COMIENCE CON LA GESTION DE SU EXPEDIENTE

    
        //DEPENDIENDO DEL ROL AL QUE PERTENEZCA EL COORDINADOR ACCEDERA A LA CARPETA DE LA CARRERA
        
        if($rol_coor == "1"){
            $ruta .="Ingenieria_Civil/";
            $ruta_solicitud .="Ingenieria_Civil/";
        }
        if($rol_coor == "2"){
            $ruta .="Ingenieria_Industrial/";
            $ruta_solicitud .="Ingenieria_Industrial/";
        }
        if($rol_coor == "3"){
            $ruta .="Ingenieria_Sistemas/";
            $ruta_solicitud .="Ingenieria_Sistemas/";
        }
        if($rol_coor == "4"){
            $ruta .="Ingenieria_Electrica/";
            $ruta_solicitud .="Ingenieria_Electrica/";
        }
        if($rol_coor == "5"){
            $ruta .="Ingenieria_Mecanica/";
            $ruta_solicitud .="Ingenieria_Mecanica/";
        }
        if($rol_coor == "6"){
            $ruta .="Ingenieria_Quimica/";
            $ruta_solicitud .="Ingenieria_Quimica/";
        }

        //AL FINAL SE LE AGREGA EL NOMBRE DE LA CARPETA A LA RUTA
        $ruta .=$nombre_carpeta;

        $ruta_solicitud .=$nombre_carpeta;

        $ruta_completa = $BASEPATHDESCARGAS."".$ruta;

        $ruta_solicitud_completa = $BASEPATHEXPEDIENTES."".$ruta_solicitud;

        

        //CREAMOS CARPETA EN ESPEDIENTES

        if (!file_exists($ruta_solicitud_completa)){

            if(!mkdir("$ruta_solicitud_completa", 0777, true)){
                echo json_encode("problema1"); 
                die;
            } 

            $sp = "call SP_CREARSOLICITUDESTUDIANTE('$ruta_solicitud','$id');";
            $query = mysqli_query($connection, $sp);

            if (!$query) {
                        
                echo json_encode("problema7");
                die;

            }

        }


        // CREAREMOS CARPETA EN DESCARGAS Y CREAMOS LOS ARCHIVOS CON LA INFORMACION DEL ESTUDIANTE


        if (!file_exists($ruta_completa)) {
            $dirmake = mkdir("$ruta_completa", 0777);
            $zip = new ZipArchive();

            
            $filename ="";

            //AQUI ACCEDEREMOS A LOS ARCHIVOS QUE SE MODIFICARAN SEGUN LA INFORMACION DEL ESTUDIANTE, SON ARCHIVOS DIFERENTES DEPENDIENDO SI PERTENECE A EXCELENCIA O NO
            if($excelencia == "1"){
                $filename = $DOCPATHEXCELENCIA;
            }
            if($excelencia == "2"){
                $filename = $DOCPATH;
            }

            //CREAMOS UNA COPIA DEL ARCHIVO A MODIFICAR
            $filenameCopy = $ruta_completa. '/DocsCoordinador-'.$cuenta.'.docx';
            $filenameCopy2 = $ruta. '/DocsCoordinador-'.$cuenta.'.docx';
            $res = copy($filename, $filenameCopy);
            @chmod($filenameCopy, 0777);

            if(!$res){
                echo json_encode("problema3");
            } else {
                
                // ABRIMOS EL ARCHIVO .DOCX COMO UN ZIP
                if ($zip->open($filenameCopy)!==TRUE) {
                    echo json_encode("problema4"); 
                    die;
                }

                // OBTENEMOS EL XML DE ESE ARCHIVO DOCX
                $xml = $zip->getFromName('word/document.xml');

                $estudiante1 = mb_strtoupper($estudiante,'utf-8');
                $coordinador1 = mb_strtoupper($coordinador,'utf-8');
                $carrera1 = mb_strtoupper($carrera,'utf-8');

                $dia = date("d");
                $mes = date("n");
                $anio = date("Y");

                $meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

                $mes_actual = $meses[$mes-1];

                // REEMPLAZAMOS LOS VALORES ANTIGUOS POR LOS DEL ESTUDIANTE
                $xml = str_replace('%ESTUDIANTENOMBRE%', $estudiante1, $xml);
                $xml = str_replace('%CUENTAESTUDIANTE%', $cuenta, $xml);
                $xml = str_replace('%COORDINADOR%', $coordinador1, $xml);
                $xml = str_replace('%CARRERANOMBRE%', $carrera1, $xml);
                $xml = str_replace('%DIA%', $dia, $xml);
                $xml = str_replace('%MES%', $mes_actual, $xml);
                $xml = str_replace('%ANIO%', $anio, $xml);


                // ESCRIBIMOS LAS MODIFICACIONES EN EL NUEVO ARCHIVO PARA GUARDAR
                if ($zip->addFromString('word/document.xml', $xml)) {

                    //ALMACENAMOS EL DIRECTORIO DE LA CARPETA EN LA BASE DE DATOS

                    $sp = "call SP_GUARDARLINKDOCESTUDIANTE('$filenameCopy2','$id');";
                    $query = mysqli_query($connection, $sp);

                    if (!$query) {
                        
                        echo json_encode("problema5");

                    }else{
                        echo json_encode("exito");
                    }

                    cerrarConexion($connection);

                }else { 
                    echo json_encode("problema6");
                }

                //CERRAMOS EL ARCHIVO
                $zip->close();
                @chmod($filenameCopy, 0777);

                
                
                

            }
        } else {
            echo json_encode("problema2");
        }


    }else{
        echo json_encode("problema1");
    }

    

?>