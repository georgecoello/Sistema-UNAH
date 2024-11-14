/**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
$(document).ready(function () {
    carrerasSelect();
    excelenciaSwitch();
});

/*FUNCION PARA LLENAR EL SELECT CON LAS CARRERAS*/
function carrerasSelect() {
    $.ajax({
        url: "../../controller/estudiante/listar-carreras.php",
        type: "GET",
        success: function (response) {
            let rol = JSON.parse(response);
            let template =`<option selected="true" disabled="disabled" value="">Seleccione Carrera</option>"`;

            rol.forEach(carrera => {
                template += `
                <option value="${carrera.id_carrera}">${carrera.nombre_carrera}</option>
                `
            });
            $("#carrera").html(template);

        }
    })
};

/**lISTENERS PARA EL SWITCH DE EXCELENCIA */
$('#estado-excelencia').click(function(){
    excelenciaSwitch();
});

/*FUNCIONES PARA LOS CHECKS TOGGLER, DECIR SI PERTENECE O NO A EXCELENCIA*/
function excelenciaSwitch(){
    let template = "";
    var isChecked=document.getElementById("estado-excelencia").checked;
    if (isChecked){
        template = "Si";
        $("#estado").html(template);
        return 1;
    } else {
        template = "No";
        $("#estado").html(template);
        return 2;
    }
    
};

/*FUNCION PARA VALIDAR Y GUARDAR EL NUEVO ESTUDIANTE*/
$("#add-student").submit(function (e) { 
    e.preventDefault();
    document.getElementById('subm').disabled=true;
    
    var x=0;
    var errormsg = "";

    const postData ={
        nombres: $("#nombres").val(),
        apellidos: $("#apellidos").val(),
        identidad: $("#identidad").val(),
        correo: $("#correo").val(),
        pass1: $("#password1").val(),
        pass2: $("#password2").val(),
        cuenta: $("#numero-cuenta").val(),
        carrera: $("#carrera").val(),
        excelencia: excelenciaSwitch(),
        hash: generateHash(4)

    }

     /*VALIDACION DE QUE LOS CAMPOS NO VENGAN VACIOS */
    
     /**NOMBRES */
     if( postData.nombres == null || postData.nombres.length == 0 || /^\s+$/.test(postData.nombres) ) {
        document.getElementById("nombres").className = "form-control is-invalid";
        errormsg += "Debe ingresar nombres  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN LETRAS */
        if (!(/^[a-zA-Z áéíóúñüàèÁÉÍÓÚÑÜ]+$/.test(postData.nombres))){
            document.getElementById("nombres").className = "form-control is-invalid";
            errormsg += "Solo se aceptan letras en nombres <br>";
            x = x+1;
        } else{
            document.getElementById("nombres").className = "form-control";
        }
    }

    /**APELLIDOS */
    if( postData.apellidos == null || postData.apellidos.length == 0 || /^\s+$/.test(postData.apellidos) ) {
        document.getElementById("apellidos").className = "form-control is-invalid";
        errormsg += "Debe ingresar apellidos  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN LETRAS */
        if (!(/^[a-zA-Z áéíóúñüàèÁÉÍÓÚÑÜ]+$/.test(postData.apellidos))){
            document.getElementById("apellidos").className = "form-control is-invalid";
            errormsg += "Solo se aceptan letras en apellidos <br>";
            x = x+1;
        } else{
            document.getElementById("apellidos").className = "form-control";
        }
    }

    /**NUMERO DE IDENTIDAD */
    if( postData.identidad == null || postData.identidad.length == 0 || /^\s+$/.test(postData.identidad) ) {
        document.getElementById("identidad").className = "form-control is-invalid";
        errormsg += "Debe ingresar el numero de identidad  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN NUMEROS */
        if (!(/^[0-9]+$/.test(postData.identidad))){
            document.getElementById("identidad").className = "form-control is-invalid";
            errormsg += "Solo se aceptan valores numericos en numero de identidad (Debe ir pegado todo) <br>";
            x = x+1;
        } else{
            document.getElementById("identidad").className = "form-control";
        }
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

    /**CORREO */
    if( postData.correo == null || postData.correo.length == 0 || /^\s+$/.test(postData.correo) ) {
        document.getElementById("correo").className = "form-control is-invalid";
        errormsg += "Debe ingresar correo electronico  <br>";
        x = x+1;
    } else{
        document.getElementById("correo").className = "form-control";
    }

    /**NUMERO DE CUENTA */
    if( postData.cuenta == null || postData.cuenta.length == 0 || /^\s+$/.test(postData.cuenta) ) {
        document.getElementById("numero-cuenta").className = "form-control is-invalid";
        errormsg += "Debe ingresar el numero de cuenta  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN NUMEROS */
        if (!(/^[0-9]+$/.test(postData.cuenta))){
            document.getElementById("numero-cuenta").className = "form-control is-invalid";
            errormsg += "Solo se aceptan valores numericos en numero de cuenta <br>";
            x = x+1;
        } else{
            document.getElementById("numero-cuenta").className = "form-control";
        }
    }

    /**SELECT DE CARRERAS */
    if( postData.carrera == null || postData.carrera.length == 0 || /^\s+$/.test(postData.carrera) ) {
        document.getElementById("carrera").style.border="1px solid #f00";
        errormsg += "Debe seleccionar su carrera  <br>";
        x = x+1;
    } else{
        document.getElementById("carrera").style.border="1px solid #ced4da";
    }

    

    /*VALIDACION DEL DOMINIO DEL CORREO ELECTRONICO */

    
    if (!(/^[a-zA-Z0-9._-]+@[unah.hn]+$/.test(postData.correo))){
        document.getElementById("correo").className = "form-control is-invalid";
        errormsg += "El correo debe ser su correo institucional de dominio unah.hn <br>";
        x = x+1;
    } else{
        document.getElementById("correo").className = "form-control";
    }


    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('subm').disabled=false;
    } else {
        $.post("../../controller/usuarios/validar-correo.php", postData, function (e){

            if(e){
                document.getElementById("correo").className = "form-control";
                $.post("../../controller/estudiante/agregar-estudiante.php", postData, function (response) {
                    let respuesta = JSON.parse(response);

                    /**VALIDA QUE SE HAYAN INSERTADO EL NUEVO ESTUDIANTE */
                    if (respuesta[0].estado){

                        $("#add-student").trigger("reset");
                        toastr["success"](respuesta[0].mensaje);
                        $.post("../../controller/estudiante/enviar-correo.php", postData, function(response){
                            toastr["warning"](response);
                        });

                        setTimeout ("redireccionar()", 500);

                        

                    } else {

                        toastr["warning"](respuesta[0].mensaje);
                        excelenciaSwitch();
                        document.getElementById('subm').disabled=false;
                    }
                    
                });

            }else{
                document.getElementById("correo").className = "form-control is-invalid";
                toastr["warning"]("Ya existe un usuario con esa cuenta de correo.");
                document.getElementById('subm').disabled=false;
            }

        });
    }
    

});

/*FUNCION PARA CREAR UNA CONTRASEÑA ALEATORIA PARA EL USUARIO */
function generateHash(length,type) {
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

/**FUNCION PARA REDIRECCIONAR A LA PANTALLA DE REGISTRO EXITOSO */
function redireccionar(){
    window.location="/expedientes-graduacion/module/estudiante/registro-exitoso.php";
}