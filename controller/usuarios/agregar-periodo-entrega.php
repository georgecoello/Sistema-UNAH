<?php

    include("../../Resources/lib/connection.php");

    if (!empty($_POST["fecha_inicio"]) && !empty($_POST["fecha_fin"]) && !empty($_POST["estado"])) {
        $inicio = $_POST["fecha_inicio"];
        $fin = $_POST["fecha_fin"];
        $estado = $_POST["estado"];

        //VALIDA QUE NO HAYA MAS DE UN PERIODO ACTIVO
        if ($estado ==  "1"){

            $query2 = "call SP_GETLISTFECHAENTREGAS();";
            $result2 = mysqli_query($connection, $query2);

            if (!$result2) {
                $json2[] = array(
                    "estado" => false,
                    "mensaje" => "No se ha podido insertar nuevo periodo, ha ocurrido un problema con la base de datos!"
                );

                $json_string = json_encode($json2);
                echo $json_string;
                cerrarConexion($connection);
                die;
            }

            $mActivos = 0;
        
            while($row = mysqli_fetch_array($result2)){

                if ($row["estado"] == "1"){
                    $mActivos = $mActivos+1;
                }

            }

            if($mActivos > 0){
                $json2[] = array(
                    "estado" => false,
                    "mensaje" => "Ya hay un periodo en estado activo, no puede haber mas de un periodo activo."
                );

                $json_string = json_encode($json2);
                echo $json_string;
                cerrarConexion($connection);
                die;
            }

            $connection->next_result();
        }

        

        
        $query = "call SP_GUARDARPERIODOENTREGA('$inicio', '$fin', '$estado');";
        $result = mysqli_query($connection, $query);


        if(!$result){
            $json[] = array(
                "estado" => false,
                "mensaje" => "No se ha podido insertar nuevo periodo, ha ocurrido un problema con la base de datos!"
            );

            $json_string = json_encode($json);
            echo $json_string;
        } else {
            $json[] = array(
                "estado" => true,
                "mensaje" => "Se ha creado el nuevo periodo satisfactoriamente!"
            );
            
            $json_string = json_encode($json);
            echo $json_string;
        }

        cerrarConexion($connection);
        
    }

?>