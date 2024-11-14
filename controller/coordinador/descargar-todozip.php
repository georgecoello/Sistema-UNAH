<?php

    include("../../Resources/lib/connection.php");
    include("../../Resources/config.php");

    $id = $_GET['id'];
    $cuenta = $_GET['cuenta'];

    $sp = "call SP_GETLINKSDOCUMENTOSESTUDIANTE('$id');";

    $result = mysqli_query($connection, $sp);
    if(!$result){

        echo json_encode('Fallo');

    }else{
    
        $json = array();
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "link" => $row["link_documento"]
            );
        }

        $zip = new ZipArchive();
        $zip_name = $BASEPATHEXPEDIENTES."/".$cuenta."_Archivos".".zip"; // Zip name

        //$zip->open($zip_name,  \ZipArchive::CREATE);
        

        if ($zip->open($zip_name, ZipArchive::CREATE)!==TRUE) {
            exit("cannot open <$zip_name>\n");
        }

        for ($x=0 ; $x<count($json) ; $x++) {

            $path = $BASEPATHEXPEDIENTES."".$json[$x]["link"];

            if(file_exists($path)){

                $archivo = file_get_contents($path);
                
                //$zip->addFile($path, basename($path));
                $zip->addFromString(basename($path), $archivo);

            }
        }
        $zip->close();

        $nombre_archivo=$cuenta."_ArchivosExpediente.zip";

        header("Content-type: application/zip");
        header('Content-disposition: attachment; filename="'.$nombre_archivo.'"');

        readfile($zip_name);

        unlink($zip_name);
        
    }

    cerrarConexion($connection);

?>