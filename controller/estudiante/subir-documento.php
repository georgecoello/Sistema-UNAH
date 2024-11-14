<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

    if(!empty($_POST["id"]) && !empty($_POST["cuenta"]) && !empty($_FILES["file"]) && !empty($_POST["ruta"]) && !empty($_POST["codigo"]) && !empty($_POST["extension"]) && !empty($_POST["id_solicitud"])){

        $id = $_POST["id"];
        $id_solicitud = $_POST["id_solicitud"];
        $cuenta = $_POST["cuenta"];
        $documento = $_FILES["file"];
        $ruta = $_POST["ruta"];
        $codigo = $_POST["codigo"];
        $extension = $_POST["extension"];

        $nombre_archivo = '/'.$cuenta;   

        //ASIGANMOS EL NOMBRE AL DOCUMENTO SEGUN SEA SU CODIGO

        if($codigo == "1"){
            $nombre_archivo.="_Constancia_verificacion_nombre";
        }

        if($codigo == "2"){
            $nombre_archivo.="_Copia_identidad";
        }

        if($codigo == "3"){
            $nombre_archivo.="_Certificado_Calificaciones";
        }

        if($codigo == "4"){
            $nombre_archivo.="_Constancia_Trabajo_Social_Comunitario";
        }

        if($codigo == "5"){
            $nombre_archivo.="_Constancia_Practica_Profesional";
        }

        if($codigo == "6"){
            $nombre_archivo.="_Solicitud_Examen_Himno";
        }

        if($codigo == "7"){
            $nombre_archivo.="_Solicitud_Extension_Tituki";
        }

        if($codigo == "8"){
            $nombre_archivo.="_Copia_Titulo_Educacion_Media";
        }

        if($codigo == "9"){
            $nombre_archivo.="_Boleta_Pago_Carnet";
        }

        if($codigo == "10"){
            $nombre_archivo.="_Boleta_Tramites_Graduacion";
        }

        if($codigo == "11"){
            $nombre_archivo.="_Boleta_Entrega_Titulo_Ventanilla";
        }

        if($codigo == "12"){
            $nombre_archivo.="_Solvencia_Registro";
        }

        if($codigo == "13"){
            $nombre_archivo.="_Foto_Ovalada";
        }

        if($codigo == "14"){
            $nombre_archivo.="_Timbre_Contratacion";
        }

        if($codigo == "15"){
            $nombre_archivo.="_Constancia_Conducta";
        }

        if($codigo == "16"){
            $nombre_archivo.="_Justificacion_Mencion_Honorifica";
        }

        if($codigo == "17"){
            $nombre_archivo.="_Solicitud_Honores_Academicos";
        }


        $nombre_archivo.= '.'.$extension;                   //AGREGAMOS LA EXTENSION AL ARCHIVO


        $ruta_final = $BASEPATHEXPEDIENTES.''.$ruta .''. $nombre_archivo;           //OBTENEMOS LA RUTA FINAL CON EL DIRECTORIO Y DOCUMENTO

        $ruta_final_base = $ruta .''. $nombre_archivo;                              //RUTA QUE GUARDAREMOS EN BASE DE DATOS SIN EL BASEPATHEXPEDIENTE



        /**VALIDAMOS QUE EL DOCUMENTO NO TENGA NINGUN ERROR */
        if ( 0 < $_FILES['file']['error'] ) {
            echo 'Error';
            die;
        }

        /**EN CASO DE QUE SE QUIERE CAMBIAR EL DOCUMENTO, ELIMINAMOS EL ACTUAL */
        if(file_exists($ruta_final)){

            unlink($ruta_final);

        }else{
            //SE ALMACENARA EN LA BASE DE DATOS SOLO CUANDO SEA LA PRIMERA VEZ QUE SE CREA EL FICHERO

            $sp = "call SP_GUARDARDOCUMENTO('$ruta_final_base','$id_solicitud', '$codigo');";
            $query = mysqli_query($connection, $sp);

            if (!$query) {   
                echo 'Error';
                die;
            }

        }

        //SUBIMOS EL DOCUMENTO A NUESTRO SERVER 
        $resultado = move_uploaded_file($documento["tmp_name"], $ruta_final);
        @chmod($ruta_final, 0777);
        if ($resultado){
            echo 'Exito';
        } else {
            echo 'Error';
        }

        cerrarConexion($connection);

    }else{
        echo 'Error';
    }


    
?>