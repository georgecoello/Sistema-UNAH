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


 LIMIT_STUDENTS_TABLE = 8;   //CANTIDAD DE ESTUDIANTES QUE SE MOSTRARAN EN LA TABLA POR PAGINA

 ROL_COORDINADOR = document.getElementById('coor-rol').getAttribute('rol');                  //ROL DEL USUARIO
 NOMBRES_COORDINADOR = document.getElementById('coor-nombre').getAttribute('nombre');    
 APELLIDOS_COORDINADOR = document.getElementById('coor-apellido').getAttribute('apellido');  
 ESTADO_EXPEDIENTE = document.getElementById('estado-expediente').getAttribute('estado');     //ESTADO DE LOS EXPEDIENTES A MOSTRAR
 ID_USER_ACT = document.getElementById('id_user_act').getAttribute('id_user');               //ID DEL USUARIO 
 
 
 /**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
 $(document).ready(function () {

    if ($('#validacion-estudiante').length) {
        let validacion_val = document.getElementById('validacion-estudiante').getAttribute('validacion'); 
        
        if(validacion_val == "2"){
            toastr["success"]("Se ha enviado a rectificar la solicitud del estudiante satisfactoriamente");
        } else {
            toastr["success"]("Se ha validado la solicitud y creado la cita.");
        }
    }
 
    inicializar();
    misDatos();
 
 });

  /**FUNCION PARA OBTENER NUMERO DE ESTUDIANTES SIN QUE SE LE HAYA SUBIDO LA CONSTANCIA Y MANDAR A CREAR PAGINACION */
  function inicializar(){
    var offset = 0;
    
    numeroEstudiantes();                                    //Se manda a obtener el numero de estudiantes que aun no se valida
    mostrarEstudiantes(LIMIT_STUDENTS_TABLE, offset);       //Manda a mostrar los estudinates
}
 

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


function numeroEstudiantes(){
    const getData = {
        rol: ROL_COORDINADOR,
        estado: ESTADO_EXPEDIENTE
    }
    $.get("../../controller/coordinador/cantidad-expediente-sinvalidar.php", getData, function (e) {
        
        if( e == null || e == 0 || /^\s+$/.test(e) ){
            console.log('null');
        }else{
            crearPaginacion(e);                 //Se crea paginacion solo si se encontrarons estudiantes sin validar
        }
        
        var text = 'Expedientes por Revisar:&nbsp;&nbsp;&nbsp;&nbsp;'+e;
        document.getElementById("numero-expedientes").innerHTML = text;         //Se manda a pintar la cantidad de estudiantes sin validar
    });
}


/**FUNCION PARA MOSTRAR ESTUDIANTES CON PAGINACION */
function mostrarEstudiantes(limiter, offset){

    const getData = {
        limit: limiter,
        offset: offset,
        rol: ROL_COORDINADOR,
        estado_expediente: ESTADO_EXPEDIENTE
    }

    $.get("../../controller/coordinador/listar-expediente-sinrevisar.php", getData, function (e) {
        
            let estudiante = JSON.parse(e);
            let template="";

            

            estudiante.forEach(estudiante => {

                if (estudiante.estado == "2"){
                    ruta_est = 'expediente-estudiante.php'
                } else if (estudiante.estado == "4") {
                    ruta_est = 'expediente-estudiante-repetido.php'
                }

                template +=`
                    <tr user-id="${estudiante.id_estudiante}" scope="row">
                        <th>${estudiante.id_estudiante}</th>
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td>
                            <a href="${ruta_est}?id=${estudiante.id_estudiante}&cuenta=${estudiante.numero_cuenta}&nombre=${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}&excelencia=${estudiante.excelencia}&solicitud=${estudiante.solicitud}&correo=${estudiante.correo}" class="btn btn-primary btn-sm" role="button">Revisar</a>
                        </td>
                    </tr>
                `
            });
            $("#estudiantes").html(template);
    });
}


/**FUNCION PARA CREAR LA PAGINACION */
function crearPaginacion(estudiantes){
    var cantidad_est = parseInt(estudiantes);
    var numero_paginas = Math.ceil(cantidad_est/LIMIT_STUDENTS_TABLE);


    /**PLUGUIN PARA LA CREACION DE PAGINACION RESPONSIVE */
    $('#paginacion').twbsPagination({
        totalPages: numero_paginas,
        visiblePages: 5,
        onPageClick: function (event, page) {

            var offset = (page-1)*LIMIT_STUDENTS_TABLE;
    
            mostrarEstudiantes(LIMIT_STUDENTS_TABLE,offset);
        }
    });
    
};


$(document).on("click", "#ir-buscar", function(){

    let search = $("#valor-buscar").val();
    const getData = {

        buscador: search,
        rol: ROL_COORDINADOR,
        estado: ESTADO_EXPEDIENTE

    }

    if(search == null || search == 0 || /^\s+$/.test(search)){
        
        inicializar();
        $("#paginacion").show();

    } else {
        
        $.get("../../controller/coordinador/buscar-expediente-sinrevisar.php", getData, function (e) {
            let estudiante = JSON.parse(e);
            let template="";

            estudiante.forEach(estudiante => {
                template +=`
                    <tr user-id="${estudiante.id_estudiante}" scope="row">
                        <th>${estudiante.id_estudiante}</th>
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td>
                            <a href="expediente-estudiante.php?id=${estudiante.id_estudiante}&cuenta=${estudiante.numero_cuenta}&nombre=${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}" class="btn btn-primary btn-sm" role="button">Revisar</a>
                        </td>
                    </tr>
                `
            });
            $("#estudiantes").html(template);

        })

        $("#paginacion").hide();

    }
    
});


/**DEJAR DE BUSCAR Y MOSTRAR TABLA NORMAL */
$(document).on("click", "#dejar-buscar", function(){

    inicializar();
    $("#paginacion").show();
    
});
