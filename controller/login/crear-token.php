<?php

    include("../../Resources/lib/connection.php");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require '../../Resources/php/Exception.php';
    require '../../Resources/php/PHPMailer.php';
    require '../../Resources/php/SMTP.php';

    if (!empty($_POST["token"]) && !empty($_POST["correo"]) && !empty($_POST["id"])){
        $token = $_POST["token"];
        $correo = $_POST["correo"];
        $id = $_POST["id"];

        $query = "call SP_CREARTOKEN('$token', '$id');";
        $result = mysqli_query($connection, $query);

        if(!$result){
            echo json_encode("Fallo conexion");
        } else {
            
            $message = '<html><body>';
            //Cabecera
            $message .= '<header><h1>Mensaje de recuperación de contraseña</h1></header>';
            //cuerpo del mensaje
            $message .= '<main><div><p>Saludos estimado(a), mediante el presente mensaje le informamos ';
            $message .= 'que su solicitud de cambio de contraseña a sido aceptada. A continuación haga click en el enlace ';
            $message .= 'para redirigirlo para que pueda cambiar su contraseña.</p><br>';
            //link
            $message .= '<a href="http://3.142.181.118/expedientesGraduacion/reestablecer-pass.php?%token='.$token.'%id='.$id.'">http://3.142.181.118/expedientesGraduacion/reestablecer-pass.php?%token='.$token.'%id='.$id.'</a>';
            $message .= '<p>En caso de no poder acceder, copie y pege el enlace en el buscador de su navegador</p><br>';
            $message .= '<p>Por favor, no responda este correo</p></div></main>';

            $message .= '</body></html>';

            $mail = new PHPMailer(true);

            try {
                //Server settings
                
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'facultadingenieria@unah.edu.hn';                     //SMTP username
                $mail->Password   = 'UGwBCc*gJL';                               //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        
                //Recipients
                $mail->setFrom('facultadingenieria@unah.edu.hn', utf8_decode('Sistema de Gestión de Expedientes de Graduación'));
                $mail->addAddress($correo);               //Name is optional
        
                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = utf8_decode('Reestablecer Credenciales');
                $mail->Body    = utf8_decode($message);
        
                $mail->send();
        
                echo json_encode("Exito");
            } catch (Exception $e) {
                echo json_encode("Fallo Envio");
            }


        }

        cerrarConexion($connection);

    } else {
        echo json_encode("Vacios");
    }


?>