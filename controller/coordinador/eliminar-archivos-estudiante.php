<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

    
    if(!empty($_GET["id"])){
        
        $id = $_GET["id"];
    

        $sp = "call SP_GETESTADOSOLICITUD('$id');";

        $result = mysqli_query($connection, $sp);

        if(!$result){

            echo json_encode("Fallo");

        }else{

            if ( mysqli_num_rows($result) == 0){
                echo json_encode("Fallo1");
                die;
            }
        
            $json = array();
            while($row = mysqli_fetch_array($result)){

                $json[] = array(
                    "link" => $row["ruta_solicitud"]
                );
            
            }

            $path = $BASEPATHEXPEDIENTES.$json[0]['link'];

            if (is_dir($path)){

                $files = glob($path.'/*');       //obtenemos todos los nombres de los ficheros
                foreach($files as $file){
                    if(is_file($file))
                    unlink($file);              //elimino el fichero
                }

            }else {
                die;
                echo json_encode("FALO2", $path);
            }
            
        }

        cerrarConexion($connection);

    } else {
        echo json_encode("Fallo");
    }

?>