ID_STUDENT = document.getElementById('id-user-session').getAttribute('id-student'); //ID ESTUDIANTE LOGUEADO
ESTADO_PERIODO = document.getElementById('estado-periodo').getAttribute('estado-periodo');

$(document).ready(function () {
    
    carrerasSelect();
    mostrarDatosEstudiante(ID_STUDENT);
    
});

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

function mostrarDatosEstudiante(id_user){

    
    $.get("../../controller/estudiante/obtener-estudiante.php", {id_user}, function (e) {
        let estudiante = JSON.parse(e);
        $("#id-estudiante").val(estudiante.id_usuario);
        $("#nombres").val(estudiante.nombres);
        $("#apellidos").val(estudiante.apellidos);
        $("#numero-cuenta").val(estudiante.cuenta);
        $("#identidad").val(estudiante.identidad);
        $("#correo").val(estudiante.correo);
        $("#cambio-correo").val(estudiante.correo);
        $("#hash-reenvio").val(estudiante.hash);

        


        /**ESTADO DE EXCELENCIA
         * 1: SI ESTA EN EXCELENCIA
         * 2: NO ESTA EN EXCELENCIA
         */
        if (estudiante.excelencia==1) {
            document.getElementById("estado-excelencia").checked = true;
            template = "Si";
            $("#estado").html(template);
        }
        
        if (estudiante.excelencia==2) {
            document.getElementById("estado-excelencia").checked = false;
            template = "No";
            $("#estado").html(template);
        }
        
        if (estudiante.estado_info==1){

            $("#estudiante-aprobado").modal({backdrop: 'static', keyboard: false});
            validada();

        }else if (estudiante.estado_info==3){

            noValidada(estudiante.id);

        }else if (estudiante.estado_info==5){

            $("#codigo-enviado-correo").modal({backdrop: 'static', keyboard: false});

        }else{
            $("#estudiante-sinaprobar").modal({backdrop: 'static', keyboard: false});
        }

        let id = estudiante.id;


        /**HABILITAMOS LOS BOTONES DEL MENU SEGUN EL ESTADO DE LA SOLICITUD */

        $.get("../../controller/estudiante/obtener-estado-soli.php", {id}, function (e) {
            let estado = JSON.parse(e);

            if ( estado.estado == "2" || estado.estado == "3" || estado.estado == "4") {

                $('#estado-exp').removeClass("disabled");

            } else if( estado.estado == "1" ){

                $('#estado-exp').removeClass("disabled");
                $('#cita-estudiante').removeClass("disabled");
                $('#descarga').removeClass("disabled");
                

            }

            $("#carrera").val(estudiante.carrera);
        });

        
        if( ESTADO_PERIODO == "2"){
            $("#crear-exp").remove();
            $("#estado-exp").remove();
        }

        

    });

};

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

/**FUNCION CUANDO LA INFORMACION DEL ESTUDIANTE HA SIDO VALIDADA */
function validada(){
    $("#text-estado-info").removeClass("text-muted");
    template = 'Aprobado';
    $("#text-estado-info").html(template);
    $("#text-estado-info").addClass("text-success");
    $('#crear-exp').removeClass("disabled");
    
    
};

/**FUNCION CUANDO LA INFORMACION DEL ESTUDIANTE NO HA SIDO VALIDADA */
function noValidada(id) {

    $("#text-estado-info").removeClass("text-muted");
    template = 'No Aprobado';
    $("#text-estado-info").html(template);
    $("#text-estado-info").addClass("text-danger");

    $("#nombres").prop('disabled', false);
    $("#apellidos").prop('disabled', false);
    $("#numero-cuenta").prop('disabled', false);
    $("#identidad").prop('disabled', false);
    $("#carrera").prop('disabled', false);
    $("#estado-excelencia").prop('disabled', false);
    $("#subm").prop('disabled', false);


    mostrarComentario(id);
};


/**FUNCION PARA RESETEAR LOS VALORES DE LA PAGINA UNA VEZ HAYA VUELTO HA ENVIAR SU INFORMACION */
function sinValidar(){
    $("#text-estado-info").removeClass("text-danger");
    template = 'Sin aprobar';
    $("#text-estado-info").html(template);
    $("#text-estado-info").addClass("text-muted");

    $("#nombres").prop('disabled', true);
    $("#apellidos").prop('disabled', true);
    $("#numero-cuenta").prop('disabled', true);
    $("#identidad").prop('disabled', true);
    $("#correo").prop('disabled', true);
    $("#carrera").prop('disabled', true);
    $("#estado-excelencia").prop('disabled', true);
    $("#subm").prop('disabled', true);
    $("#comentario").val("");
}


/**FUNCION PARA MOSTRAR EL COMENTARIO DEL POR QUE ESTA MAL LA INFORMACION EN CASO DE NO HABER SIDO APROBADA */
function mostrarComentario(id) {
    $.get("../../controller/estudiante/obtener-comentario.php", {id}, function (e) {
        let comentario = JSON.parse(e);
        template = comentario.comentario;
        
        if(comentario == "Fallo"){

            toastr["warning"]("UPS! Ha ocurrido un error.");

        } else{
            $("#comentario").val(comentario.comentario);
            $("#comentario-modal").html(template);
            $("#estudiante-noaprobado").modal({backdrop: 'static', keyboard: false});
        }
    });
};


/**ENVIAR LA INFORMACDION UNA VEZ RECTIFICADA */
$("#edit-student").submit(function (e) { 
    e.preventDefault();
    
    
    document.getElementById('subm').disabled=true;
    
    var x=0;
    var errormsg = "";

    const postData ={
        id: $("#id-estudiante").val(),
        nombres: $("#nombres").val(),
        apellidos: $("#apellidos").val(),
        identidad: $("#identidad").val(),
        correo: $("#correo").val(),
        cuenta: $("#numero-cuenta").val(),
        carrera: $("#carrera").val(),
        excelencia: excelenciaSwitch()
    }
    

     /*VALIDACION DE QUE LOS CAMPOS NO VENGAN VACIOS */
    
     /**NOMBRES */
     if( postData.nombres == null || postData.nombres.length == 0 || /^\s+$/.test(postData.nombres) ) {
        document.getElementById("nombres").className = "form-control is-invalid";
        errormsg += "Debe ingresar nombres  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN LETRAS */
        if (!(/^[a-zA-Z áéíóúñüàè]+$/.test(postData.nombres))){
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
        if (!(/^[a-zA-Z áéíóúñüàè]+$/.test(postData.apellidos))){
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

        $.post("../../controller/estudiante/editar-estudiante.php", postData, function (e) {
            let respuesta = JSON.parse(e);
            
            if(respuesta == "Fallo"){
                toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo");
            }else{
                toastr["success"]("Se ha modificado la informacion exitosamente.");
                sinValidar();
                mostrarDatosEstudiante(ID_STUDENT);
            }
        });

    }


});

/**REENVIÓ DEL HASH AL CORREO INSTITUCIONAL */
$(document).on("click", "#reenviar-correo", function(){

    document.getElementById('reenviar-correo').disabled=true;

    const postData = {
        hash: $("#hash-reenvio").val(),
        correo: $("#correo").val()
    }

    $.post("../../controller/estudiante/enviar-correo.php", postData, function(response){
        toastr["warning"](response);
        document.getElementById('reenviar-correo').disabled=false;
    });

});


/**INGRESAR HASH */
$(document).on("click", "#ingresar-hash", function(){

    document.getElementById('ingresar-hash').disabled=true;

    var errormsg = "";
    var x = 0;


    const postData = {
        hash: $("#hash").val(),
        id: $("#id-estudiante").val()
    }

    var hash_valido = $("#hash-reenvio").val();

    if( postData.hash == null || postData.hash.length == 0 || /^\s+$/.test(postData.hash) ) {
        document.getElementById("hash").className = "form-control is-invalid";
        errormsg += "Debe ingresar código  <br>";
        x = x+1;
    } else{
        document.getElementById("hash").className = "form-control";
    }

    if (postData.hash !== hash_valido){
        errormsg += "El código ingresado es invalido ";
        x = x+1;
    }


    if (x > 0){

        toastr["warning"](errormsg);
        document.getElementById('ingresar-hash').disabled=false;

    } else {

        $.post("../../controller/estudiante/ingresar-hash.php", postData, function (e) {
            let respuesta = JSON.parse(e);
            
            if(respuesta == "Fallo"){
                toastr["warning"]("UPS! Ha ocurrido un error, inténtelo de nuevo");
                document.getElementById('ingresar-hash').disabled=false;
            }else{
                toastr["success"]("Se ha ingresado el código satisfactoriamente");
                $('#codigo-enviado-correo').modal('hide');
                $('.modal-backdrop').hide();
                sinValidar();
                mostrarDatosEstudiante(ID_STUDENT);
                document.getElementById('ingresar-hash').disabled=false;
            }
        });
        
        
    }

    

});

