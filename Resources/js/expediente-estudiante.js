/**
 * ESTADOS EXPEDIENTE DE ESTUDIANTE
 * 
 * 1: REVISADA (APROBADA)
 * 2: SIN REVISAR
 * 3: REVISADA (NO APROBADA)
 * 4: SIN REVISAR (REPETIDA)
 * 5: SIN ENVIAR (EL ESTUDIANTE AUN NO LO ENVIA)
 * 
 */


 ROL_COORDINADOR = document.getElementById('coor-rol').getAttribute('rol');                                     //ROL DEL USUARIO
 NOMBRES_COORDINADOR = document.getElementById('coor-nombre').getAttribute('nombre');    
 APELLIDOS_COORDINADOR = document.getElementById('coor-apellido').getAttribute('apellido');  
 ESTADO_EXPEDIENTE = document.getElementById('estado-expediente').getAttribute('estado');                       //ESTADO DE LOS EXPEDIENTES A MOSTRAR
 ID_USER_ACT = document.getElementById('id_user_act').getAttribute('id_user');                                   //ID DEL USUARIO 
 ID_ESTUDIANTE = document.getElementById('estudiante-id').getAttribute('id_estudiante');  
 EXCELENCIA_ESTUDIANTE = document.getElementById('estudiante-excelencia').getAttribute('excelencia'); 
 SOLICITUD_ESTUDIANTE = document.getElementById('estudiante-solicitud').getAttribute('solicitud'); 
 CORREO_ESTUDIANTE = document.getElementById('estudiante-correo').getAttribute('correo'); 

  /**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
$(document).ready(function () {


    //ELIMINAMOS LOS CAMPOS QUE SON DE EXCELENCIA
    if (EXCELENCIA_ESTUDIANTE == "2"){
        $('.docs-excelencia').remove();
    }

    //MUESTRA LOS DOCUMENTOS QUE SE PIDEN EN OTROS
    $.get("../../controller/estudiante/obtener-otros-docs.php", {carrera: ROL_COORDINADOR}, function(e) {
        let docs = JSON.parse(e);

        let template = "";

        docs.forEach(doc => {
            template += `
            <li>${doc.nombre}</li>
            `
        });
        $("#lista-otros").html(template);
    });
    
 
    linkDescargas();
    comentariosInvalidos();


});



/**FUNCION QUE LLENA EL MODAL DE DATOS DEL USUARIO */
function misDatos(){

    const getData = {
        id: ID_USER_ACT
    }

    $.get("../../controller/coordinador/obtener-misdatos.php", getData, function (e) {
        let misDatos = JSON.parse(e);
        
        if(misDatos == "Fallo"){

            toastr["warning"]("UPS! Ha ocurrido un error.");

        } else{
            $("#nombres-datos").val(misDatos.nombres);
            $("#apellidos-datos").val(misDatos.apellidos);
            $("#correo-datos").val(misDatos.correo);
            $("#rol").val(misDatos.rol);
        }

    });

}



/**FUNCION QUE LE ASIGNA AL HREF DE CADA BOTON EL LINK DE DESCARGA DEL DOCUMENTO DEL ESTUDIANTE */
function linkDescargas(){

    const getData = {
        id: ID_ESTUDIANTE
    }

    $.get("../../controller/coordinador/obtener-links-documentos.php", getData, function (e) {
        let documentos = JSON.parse(e);

        if (documentos == 'Fallo'){
            toastr["warning"]("Ups! Ha ocurrido un error");
        } else{

            if (documentos.length !== 0){

                var x_valida = 0;
                var x_invalida = 0;
                
                var estudianteExce=0;

                documentos.forEach(documento => {
                    if (documento.codigo==18) {
                        estudianteExce=1;
                    }

                    
                    /**AQUI ASIGNAMOS LOS LINKS DE DESCARGA A LOS BOTONES Y EL ID DEL DOCUMENTO */
                    let elementoHref = "btn-descarga-" + documento.codigo;
                    let elementoHref2 = "btn-ver-" + documento.codigo;
                    let elementoId = "doc-val-" + documento.codigo;

                    let linkDescargaDoc = '../../controller/coordinador/descargar-documento-estudiante.php?id='+documento.id;
                    let linkVistaDoc = '../../controller/coordinador/ver-documento-estudiante.php?id='+documento.id;

                    document.getElementById(elementoHref).href=linkDescargaDoc; 
                    document.getElementById(elementoHref2).href=linkVistaDoc; 
                    document.getElementById(elementoId).setAttribute("id-document", documento.id)

                    /**AQUI QUITAMOS LOS BADGES UNA VEZ SE HAYA VALIDADO O INVALIDADO LA INFORMACION */

                    let elementoBadget = "#doc-val-" + documento.codigo;

                    if (documento.estado == "1"){
                        html_badget = "<span class='badge rounded-pill bg-success text-white'>Validado</span>"
                        $(elementoBadget).html(html_badget);
                        x_valida++;
                    }else if (documento.estado == "3"){
                        html_badget = "<span class='badge rounded-pill bg-danger text-white'>Invalidado</span>"
                        $(elementoBadget).html(html_badget);
                        x_invalida++;
                    }

                    
                });

                let estado_soli = documentos[0].estado_solicitud
                validarCantidadRevisados(x_valida, x_invalida,estudianteExce, estado_soli);
            
            }
        }
    });
};

/**AQUI SE ABRE EL MODAL EN CASO DE SELECCIONAR SI */
$(".si").click(function () { 

    let element_codigo = $(this)[0].parentElement.parentElement;           
    let codigo = $(element_codigo).attr("codigo");                             //OBTENEMOS EL CODIGO DEL DOCUMENTO

    let element_doc = $(this)[0].parentElement.parentElement.getElementsByClassName("nombre-doc")[0].innerHTML;  

    let element_id = document.getElementById('doc-val-'+codigo).getAttribute("id-document");

    
    $("#text-modal-si").html(element_doc);

    $("#codigo-doc-si").val(element_id);

    $("#modal-si").modal({backdrop: 'static', keyboard: false});

    
    
});

/**AQUI SE ENVIA A CAMBIAR EL ESTADO DEL DOCUMENTO A VALIDADO EN LA BASE DE DATOS */
$("#validar-doc-si").click(function () { 

    const postData = {
        id: $("#codigo-doc-si").val()
    }

    $.post("../../controller/coordinador/validar-documento.php", postData, function (e) {
        let respuesta = JSON.parse(e);
                
        if(respuesta == "Fallo"){
            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo");
        }else{
            toastr["success"]("Se ha validado el documento");
            linkDescargas();
        }


    });
    
    
});

/**AQUI SE ABRE EL MODAL EN CASO DE SELECCIONAR NO */
$(".no").click(function () { 

    let element_codigo = $(this)[0].parentElement.parentElement;           
    let codigo = $(element_codigo).attr("codigo");                             //OBTENEMOS EL CODIGO DEL DOCUMENTO

    let element_doc = $(this)[0].parentElement.parentElement.getElementsByClassName("nombre-doc")[0].innerHTML;  

    let element_id = document.getElementById('doc-val-'+codigo).getAttribute("id-document");

    
    $("#text-modal-no").html(element_doc);

    $("#codigo-doc-no").val(element_id);

    $("#modal-no").modal({backdrop: 'static', keyboard: false});
    
});

/**AQUI SE ENVIA A CAMBIAR EL ESTADO DEL DOCUMENTO A INVALIDO EN LA BASE DE DATOS Y SE AGREGA LA DESCRIPCION DEL POR QUE */
$("#validar-doc-no").click(function () { 

    const postData = {
        id_doc: $("#codigo-doc-no").val(),
        id_user: ID_USER_ACT,
        descripcion: $("#descripcion-no").val()
    }

    if( postData.descripcion == null || postData.descripcion.length == 0 || /^\s+$/.test(postData.descripcion) ) {
        document.getElementById("descripcion-no").className = "form-control is-invalid";
        toastr["warning"]("Debe especificar la razon por la cual el documento no es valido");
    } else{

        document.getElementById("descripcion-no").className = "form-control";
        $("#descripcion-no").val("");

        $.post("../../controller/coordinador/invalidar-documento.php", postData, function (e) {
            let respuesta = JSON.parse(e);
                    
            if(respuesta == "Fallo1"){
                toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err1");
            }else if(respuesta == "Fallo2"){
                toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err2");
            }else{
                toastr["success"]("Se ha invalidado el documento");
                linkDescargas();
                comentariosInvalidos();
            }

            $('#modal-no').modal('hide');
            $('.modal-backdrop').hide();
    
    
        });

    }
    
    
});


/**AQUI SE OBTIENEN LOS COMENTARIOS POR LOS CUALES LOS DOCUMENTOS FUERON INVALIDADOS Y SE MUESTRAN EN EL TEXTAREA DE DESCRIPCION */
function comentariosInvalidos() {

    const getData = {
        solicitud: SOLICITUD_ESTUDIANTE
    }

    $.get("../../controller/coordinador/obtener-comentarios-docs.php", getData, function (e) {
        let documentos = JSON.parse(e);

        if (documentos == 'Fallo'){
            toastr["warning"]("Ups! Ha ocurrido un error");
        } else{

            if (documentos.length !== 0){

                documentos.forEach(documento => {

                    let elementoDescripcion = "#comentario-" + documento.codigo;

                    $(elementoDescripcion).val(documento.descripcion)

                    
                });

            }
        }
    });
};


/**AQUI SE VALIDA QUE SE HAYAN REVISADO TODOS LOS DOCUMENTOS PARA HABILITAR EL BOTON DE ENVIO O ENVIO PARA RECTIFICAR */
function validarCantidadRevisados(n_validos, n_invalidos,estudianteExce, estado_soli){

    if (estado_soli == "2"){

        let filasTabla = $("#example tr").length-5;     //PARA CUANDO SE VUELVA A ACTIVAR LA CERTIFICACIÓN DE NOTAS SE CAMBIARA EL -5 POR UN -4 (se quitan 3, por que ya no se pide la constancia uv, solvencia de biblioteca ni carta conducta)
        
        if (estudianteExce==0) {
            filasTabla=filasTabla+1;
        }

        var n_total = n_validos + n_invalidos;

        if (filasTabla == n_total){

            if (n_invalidos > 0){
                document.getElementById('enviar-rectificar').hidden=false;
                toastr["success"]("Se ha habilitado el boton para enviar a rectificar documentos");
            }else{
                document.getElementById('enviar').hidden=false;
                toastr["success"]("Se ha habilitado el boton para validar expediente");
            }            

        }
    }

};

/**AQUI SE ENVIA A CAMBIAR EL ESTADO DE LA SOLICITUD A NO APROBADO EN LA BASE DE DATOS */
$("#enviar-rectificar").click(function () { 

    document.getElementById('enviar-rectificar').disabled=true;

    const postData = {
        id: SOLICITUD_ESTUDIANTE
    };

    $.post("../../controller/coordinador/invalidar-solicitud.php", postData, function (e) {
        let respuesta = JSON.parse(e);
                    
            if(respuesta == "Fallo1"){
                toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err1");
                document.getElementById('enviar-rectificar').disabled=false;
            }else if(respuesta == "Fallo2"){
                toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err2");
                document.getElementById('enviar-rectificar').disabled=false;
            }else{
                toastr["success"]("Se ha validado ha enviado a rectificar la solicitud.");

                 /**SE ENVIA EL CORREO AL ESTUDIANTE */
                let correo = CORREO_ESTUDIANTE;

                $.post("../../controller/coordinador/enviar-correo-expediente.php", {correo}, function(response){
                    toastr["warning"](response);
                });
            }
            
    });

    
});


/**ABRE EL MODAL PARA CREAR CITA */
$("#enviar").click(function () { 
    
    $("#aprobar-cita").modal({backdrop: 'static', keyboard: false});
    
});


/**AQUI SE ENVIA A CAMBIAR EL ESTADO DE LA SOLICITUD A APROBADO EN LA BASE DE DATOS */
$("#enviar-validar-cita").click(function () { 
    
    document.getElementById('enviar-validar-cita').disabled=true;

    var x = 0;
    var errormsg = "";
    
    const postData = {
        id_coordinador: ID_USER_ACT,
        id_estudiante: ID_ESTUDIANTE,
        id_solicitud: SOLICITUD_ESTUDIANTE,
        fecha: $("#fecha-cita").val()+"T"+$("#hora-cita").val()
    };


    /**VALIDAMOS QUE LOS CAMPOS DE FECHA Y HORA ESTEN LLENOS */
    if( $("#fecha-cita").val()== null || $("#fecha-cita").val() == 0 || /^\s+$/.test($("#fecha-cita").val()) ) {
        document.getElementById("fecha-cita").className = "form-control is-invalid";
        errormsg += "Debe ingresar fecha  <br>";
        x = x+1;
    } else{
        document.getElementById("fecha-cita").className = "form-control";
    }

    if( $("#hora-cita").val()== null || $("#hora-cita").val() == 0 || /^\s+$/.test($("#hora-cita").val()) ) {
        document.getElementById("hora-cita").className = "form-control is-invalid";
        errormsg += "Debe ingresar hora  <br>";
        x = x+1;
    } else{
        document.getElementById("hora-cita").className = "form-control";
    }

    var hora = $("#hora-cita").val();
    var minutos = parseInt(hora.split(":")[1]) ;
    

    /**VALIDAMOS QUE LOS MINUTOS SEAN MULTIPLOS DE 5 */
    if ( minutos == 0 || minutos % 5 == 0 ) { //hacemos la comparación
        document.getElementById("hora-cita").className = "form-control";
    }else{

        document.getElementById("hora-cita").className = "form-control is-invalid";
        errormsg += "Los minutos de la hora de la cita deben ser multiplos de '5'. <br>";
        x = x+1;

    }

    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('enviar-validar-cita').disabled=false;

    }else{

        const getData = {
            rol: ROL_COORDINADOR,
            fecha: $("#fecha-cita").val()+"T"+$("#hora-cita").val()
        }
        

        /**VALIDAMOS QUE NO EXISTA UNA CITA A LA MISMA HORA Y FECHA */
        $.get("../../controller/coordinador/validar-fecha-cita.php", getData, function (e) {
            let numero = JSON.parse(e);
            let numero_validar = parseInt(numero.numero);

            if(numero_validar > 0){ 
                toastr["warning"]("Ya existe una cita a esa hora y en esa fecha");
                document.getElementById('enviar-validar-cita').disabled=false;

            } else {

                /**ENVIAMOS A GUARDAR A LA BASE DE DATOS LA CITA Y CAMBIAMOS EL ESTADO DEL EXPEDIENTE A APROBADO */
                $.post("../../controller/coordinador/validar-solicitud.php", postData, function (e) {
                    let respuesta = JSON.parse(e);
                                
                        if(respuesta == "Fallo1"){
                            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err1");
                            document.getElementById('enviar-validar-cita').disabled=false;
                        }else if(respuesta == "Fallo2"){
                            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err2");
                            document.getElementById('enviar-validar-cita').disabled=false;
                        }else{
                            toastr["success"]("Se ha validado la solicitud y creado la cita.");

                            /**SE ENVIA EL CORREO AL ESTUDIANTE */

                            let correo = CORREO_ESTUDIANTE;

                            $.post("../../controller/coordinador/enviar-correo-expediente.php", {correo}, function(response){
                                toastr["warning"](response);
                            });

                            $('#aprobar-cita').modal('hide');
                            $('.modal-backdrop').hide();

                        }

                        
                        
                });

		$.get("../../controller/coordinador/eliminar-archivos-estudiante.php", {id: ID_ESTUDIANTE}, function (e) {
                    console.log(e);
                });
            }

        });

    }

    
});

/**SE MANDA A VISUALIZAR LAS HORAS EN LAS QUE YA HAY CITA EN LA FECHA INGRESADA */
$("#ver-horas").click(function () { 

    document.getElementById('ver-horas').disabled=true;
    
    const getData = {
        rol: ROL_COORDINADOR,
        buscador: $("#fecha-cita").val()
    };


    /**VALIDAMOS QUE EL CAMPO DE FECHA ESTE LLENO */
    if( $("#fecha-cita").val()== null || $("#fecha-cita").val() == 0 || /^\s+$/.test($("#fecha-cita").val()) ) {
        document.getElementById("fecha-cita").className = "form-control is-invalid";
        toastr["warning"]("Debe ingresar una fecha primero");
        document.getElementById('ver-horas').disabled=false;

    } else{

        document.getElementById("fecha-cita").className = "form-control";

        
        $.get("../../controller/coordinador/obtener-horas-fecha.php", getData, function (e) {
        
            let fechas = JSON.parse(e);

            if (fechas == "problema"){
                toastr["warning"]("UPS! Ha ocurrido un problema");
            } else {
                
                if(fechas.length == 0){

                    var text = "Aun no existen citas para esta fecha";
                    document.getElementById("sin-horas").innerHTML = text;

                    var text = "";
                    document.getElementById("horas").innerHTML = text;
                    document.getElementById('ver-horas').disabled=false;

                }else{

                    var text = "";
                    document.getElementById("sin-horas").innerHTML = text;

                    let template="";

                    fechas.forEach(fecha => {

                        var cita = fecha.fecha.split(" ");
                        var hora = cita[1];
                        
        
                        template +=`
                            <div class="col-2"> 
                                <span class="badge bg-secondary text-white">${hora}</span>
                            </div>
                        `
                    });
                    $("#horas").html(template);
                    document.getElementById('ver-horas').disabled=false;

                }
                
            }

        });

    }

   


    
});

/**FUNCION PARA EL CAMBIO DE CONTRASEÑA */
$(document).on("click", "#cambiar-pass", function(){

    var x = 0;
    var errormsg = "";
    document.getElementById('cambiar-pass').disabled=true;

    const postData ={
        passAct: $("#pass-act").val(),
        pass1: $("#pass1").val(),
        pass2: $("#pass2").val(),
        id: ID_USER_ACT
    }

    /**PASSACT */
    if( postData.passAct == null || postData.passAct.length == 0 || /^\s+$/.test(postData.passAct) ) {
        document.getElementById("pass-act").className = "form-control is-invalid";
        errormsg += "Debe ingresar contraseña actual  <br>";
        x = x+1;
    } else{
        document.getElementById("pass-act").className = "form-control";
    }

    /**PASS1 */
    if( postData.pass1 == null || postData.pass1.length == 0 || /^\s+$/.test(postData.pass1) ) {
        document.getElementById("pass1").className = "form-control is-invalid";
        errormsg += "Debe ingresar nueva contraseña  <br>";
        x = x+1;
    } else{
        document.getElementById("pass1").className = "form-control";
    }

    /**PASS2 */
    if( postData.pass2 == null || postData.pass2.length == 0 || /^\s+$/.test(postData.pass2) ) {
        document.getElementById("pass2").className = "form-control is-invalid";
        errormsg += "Debe ingresar confirmacion de nueva contraseña  <br>";
        x = x+1;
    } else{
        document.getElementById("pass2").className = "form-control";
    }

    /**VALIDAR QUE LAS PASSWORDS COINCIDAN */
    if (postData.pass1 != postData.pass2){
        document.getElementById("pass1").className = "form-control is-invalid";
        document.getElementById("pass2").className = "form-control is-invalid";
        errormsg += "Las contraseñas no coinciden  <br>";
        x = x+1;
    } else{
        document.getElementById("pass1").className = "form-control";
        document.getElementById("pass2").className = "form-control";
    }
    

    if (postData.pass1.length < 8){
        errormsg += "Las contraseñas deben llevar mas de 8 caracteres  <br>";
        document.getElementById("pass1").className = "form-control is-invalid";
        x = x+1;
    }else{
        document.getElementById("pass1").className = "form-control";
    }

    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('cambiar-pass').disabled=false;
    } else{

        $.post("../../controller/usuarios/obtener-pass.php", postData, function (e) {

            let respuesta = JSON.parse(e);

            console.log(respuesta);

            if(respuesta){
                document.getElementById("pass-act").className = "form-control";
                
                document.getElementById("pass-act").className = "form-control";
                document.getElementById("pass1").className = "form-control";
                document.getElementById('cambiar-pass').disabled=false;

                $.post("../../controller/coordinador/cambiar-pass.php", postData,function (e) {
                    let resp = JSON.parse(e);

            
                    if(resp == "Vacios"){
                        toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo.");
                    } else if(resp == "Error"){
                        toastr["warning"]("UPS! Ha habido un error, intentelo de nuevo.");
                    } else if(resp == "Exito"){
                        toastr["success"]("Se ha modificado la contraseña satisfactoriamente.");
                        $("#cambio-pass-user").trigger("reset");
                        $('#cambio-pass').modal('hide');
                        $('.modal-backdrop').hide();
                    }
    
                    
                });
                

            }else{
                
                toastr["warning"]('La contraseña actual introducida es incorrecta');
                document.getElementById("pass-act").className = "form-control is-invalid";
                document.getElementById('cambiar-pass').disabled=false;
            }
                
        });
    }

    

    


    

});
