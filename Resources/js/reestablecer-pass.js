$(document).ready(function () {
    document.getElementById('cambio').disabled=true;
    toastr.options = {

        "timeOut": "9000",
        "extendedTimeOut": "2000",
    }

    var urlAct = window.location.href;
    var datos = urlAct.split('%');

    var token = datos[1].split("=")[1];
    var id = datos[2].split("=")[1];
    
    const postData ={
        token: token,
        id: id
    }

    $.post("controller/login/validar-token.php", postData, function (e) {
        let resp = JSON.parse(e);
        if(resp == "Error consulta"){
            toastr["warning"]("UPS! Ha habido un error, actualice la pagina. Si el problema persiste solicite de nuevo correo para cambio de contraseña");
        } else if(resp == "Vacios"){
            toastr["warning"]("UPS! Ha habido un error, actualice la pagina. Si el problema persiste solicite de nuevo correo para cambio de contraseña");
        } else if(resp == "Sin token"){
            toastr["warning"]("UPS! El token es invalido, solicite de nuevo correo para cambio de contraseña");
        } else if(resp[0].estado_token == "2"){
            toastr["warning"]("UPS! El token ya fue usado, solicite de nuevo un correo para cambio de contraseña");
        } else {
            toastr["success"]("Token validado, favor ingresaro nueva contraseña","Validado");
            document.getElementById('cambio').disabled=false;
        }
    });

});

$("#reset-password").submit(function (e){
    e.preventDefault();
    document.getElementById('cambio').disabled=true;
    var urlAct = window.location.href;
    var datos = urlAct.split('%');

    var token = datos[1].split("=")[1];
    var id = datos[2].split("=")[1];

    var x = 0;
    var errormsg = "";

    const postData ={
        token: token,
        id: id,
        pass1: $("#password1").val(),
        pass2: $("#password2").val()
    }

    /**PPASS1 */
    if( postData.pass1 == null || postData.pass1.length == 0 || /^\s+$/.test(postData.pass1) ) {
        document.getElementById("password1").className = "form-control is-invalid";
        errormsg += "Debe ingresar contraseña  <br>";
        x = x+1;
    } else{
        document.getElementById("password1").className = "form-control";
    }

    /**PASS2 */
    if( postData.pass2 == null || postData.pass2.length == 0 || /^\s+$/.test(postData.pass2) ) {
        document.getElementById("password2").className = "form-control is-invalid";
        errormsg += "Debe ingresar confirmacion de contraseña  <br>";
        x = x+1;
    } else{
        document.getElementById("password2").className = "form-control";
    }

    /**VALIDAR QUE LAS PASSWORDS COINCIDAN */
    if (postData.pass1 != postData.pass2){
        document.getElementById("password1").className = "form-control is-invalid";
        document.getElementById("password2").className = "form-control is-invalid";
        errormsg += "Las contraseñas no coinciden  <br>";
        x = x+1;
    } else{
        document.getElementById("password1").className = "form-control";
        document.getElementById("password2").className = "form-control";
    }
    

    if (postData.pass1.length < 8){
        errormsg += "Las contraseñas deben llevar mas de 8 caracteres  <br>";
        document.getElementById("password1").className = "form-control is-invalid";
        x = x+1;
    }else{
        document.getElementById("password1").className = "form-control";
    }
    
    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('cambio').disabled=false;
    } else{

        $.post("controller/login/cambiar-pass.php", postData,function (e) {
            let resp = JSON.parse(e);
            console.log(resp);

            if(resp == "Vacios"){
                toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo. Si el problema persiste solicite de nuevo correo para cambio de contraseña");
                document.getElementById('cambio').disabled=false;
            } else if(resp == "Error"){
                toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo. Si el problema persiste solicite de nuevo correo para cambio de contraseña");
                document.getElementById('cambio').disabled=false;
            } else if(resp == "Exito"){
                toastr["success"]("Se ha modificado la contraseña satisfactoriamente, dentro de unos segundos sera redirigido a la pagina de login");
                setTimeout ("redireccionar()", 9000);
            }

        
        });

    }

    

});

function redireccionar(){
    window.location="../index.php";
}