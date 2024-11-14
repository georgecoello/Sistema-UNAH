<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require '../../Resources/php/Exception.php';
    require '../../Resources/php/PHPMailer.php';
    require '../../Resources/php/SMTP.php';
    
    //Instantiation and passing `true` enables exceptions
    $pass = $_POST["hash"];
    $correo = $_POST["correo"];

    $message = file_get_contents('../../Resources/mail/mail_verificacion.html');
    $message = str_replace('%contra%', $pass, $message);
    $mail = new PHPMailer(true);

    try {
        //Server settings
        
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'facultadingenieria@unah.edu.hn';                     //SMTP username
        $mail->Password   = 'UGwBCc*gJL';                                //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom('facultadingenieria@unah.edu.hn', utf8_decode('Sistema de Gestión de Expedientes de Graduación'));
        $mail->addAddress($correo);               //Name is optional

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = utf8_decode('Codigo de Verificacion Estudiante');
        $mail->AddEmbeddedImage('../../Resources/icon/Ingenieria.png','imagen');
        $mail->Body    = utf8_decode($message);

        $mail->send();

        echo 'Se ha enviado el código de habilitación a su correo institucional';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
?>