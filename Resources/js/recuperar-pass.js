/**REESTABLECER CONTRASEÑA */

 $("#reestablecer").submit(function (e) { 
    e.preventDefault();
    document.getElementById('res-btn').disabled=true;

    var x = 0;
    var errormsg = "";

    const postData = {
        correo: $("#correo").val()

    };  


    /**VALIDACION DE LOS CAMPOS*/

    if( postData.correo == null || postData.correo.length == 0 || /^\s+$/.test(postData.correo) ) {
        document.getElementById("correo").className = "form-control is-invalid";
        errormsg += "Ingrese su correo electronico.  <br>";
        x = x+1;
    } else{
        document.getElementById("correo").className = "form-control";
    }

    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('res-btn').disabled=false;
        
    } else{
        /**VALIDAR QUE EXISTA CORREO */
        $.post("controller/usuarios/validar-correo.php", postData, function (e) {
            if (e){
                toastr["warning"]("No existe ninguna cuenta con este correo");
                document.getElementById('res-btn').disabled=false;
                
            } else {
                /**ENVIAR TOKEN AL CORREO */
                $.post("controller/login/info-user2.php", postData, function (e){
                    let user = JSON.parse(e);

                    const postData = {
                        token: generateTOKEN(10),
                        correo: user.correo,
                        id: user.id
                    }

                    $.post("controller/login/crear-token.php", postData, function (e) {
                        let resp = JSON.parse(e);
                        if(resp == "Fallo conexion"){
                            toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo");
                        }
                        if(resp == "Fallo Envio"){
                            toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo");
                        }
                        if(resp == "Vacios"){
                            toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo");
                        }
                        if(resp == "Exito"){
                            window.location="../../correo-enviado.php";
                        }
                        document.getElementById('res-btn').disabled=false;
                        
                    });

                    
                });
            }
        });
    }

    

});

/**FUNCION PARA GENERAR TOKEN */
function generateTOKEN(length,type) {
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var pass = "";
    for (i=0; i < length; i++){
        if(type == 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    return pass;
};