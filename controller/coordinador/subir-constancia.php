<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

    if(!empty($_POST["id"]) && !empty($_POST["cuenta"]) && !empty($_FILES["file"]) && !empty($_POST["ruta"]) && !empty($_POST["estado"])){

        $id = $_POST["id"];
        $cuenta = $_POST["cuenta"];
        $constancia = $_FILES["file"];
        $ruta = $_POST["ruta"];
        $estado = $_POST["estado"];

        $nombre_archivo = '/ConstanciaEgresado_'.$cuenta.'.pdf';    //NOMBRE QUE OBTENDRA LA CONSTANCIA
        $ruta_final = $BASEPATHDESCARGAS.''.$ruta .''. $nombre_archivo; 

        $ruta_final_base = $ruta .''. $nombre_archivo;

        /**EN CASO DE QUE SE QUIERE CAMBIAR EL DOCUMENTO, ELIMINAMOS EL ACTUAL */
        if(file_exists($ruta_final)){
            unlink($ruta_final);
        }

        if ( 0 < $_FILES['file']['error'] ) {
            echo 'Error';

        }else{

            $resultado = move_uploaded_file($constancia["tmp_name"], $ruta_final);
            @chmod($ruta_final, 0777);
            
            if ($resultado){

                /**AQUI SE HARA LA INSERCION EN LA BASE DE DATOS SOLO CUANDO SE AGREGUE LA CONSTANCIA POR PRIMERA VEZ, PARA GUARDAR LA RUTA Y CAMBIAR EL ESTADO DE QUE AL ESTUDIANTE YA SE LE SUBIO LA CONSTANCIA */
                if($estado=="1"){

                    $sp = "call SP_GUARDARLINKDESCARGAESTUDIANTE('$ruta_final_base','$id');";
                    $query = mysqli_query($connection, $sp);

                    if (!$query) {
                            
                        echo 'Error';

                    }else{
                        echo "Exito";
                    }
                        
                }else{

                    echo 'Exito';
                }

                cerrarConexion($connection);
                
                

                
            } else {
                echo 'Error';
            }

        }

    }else{
        echo 'Error';
    }


    
?>