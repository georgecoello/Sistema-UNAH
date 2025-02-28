/**
 * ESTADOS SOLICITUD DE ESTUDIANTE
 * 
 * 1: REVISADA (APROBADA)
 * 2: SIN REVISAR
 * 3: REVISADA (NO APROBADA)
 * 4: SIN REVISAR (REPETIDA)
 * 5: SIN ENVIAR
 * 
 */


LIMIT_STUDENTS_TABLE = 8;   //CANTIDAD DE ESTUDIANTES QUE SE MOSTRARAN EN LA TABLA POR PAGINA

ROL_COORDINADOR = document.getElementById('coor-rol').getAttribute('rol');                  //ROL DEL USUARIO
NOMBRES_COORDINADOR = document.getElementById('coor-nombre').getAttribute('nombre');    
APELLIDOS_COORDINADOR = document.getElementById('coor-apellido').getAttribute('apellido');  
ESTADO_INFO_ESTUDIANTE = document.getElementById('estado-info').getAttribute('estado');     //ESTADO DE LA INFORMACION DE ESTUDIANTES
ID_USER_ACT = document.getElementById('id_user_act').getAttribute('id_user');               //ID DEL USUARIO 


/**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
$(document).ready(function () {

   inicializar();
   misDatos();
    

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

/**INICIALIZA TABLA Y PAGINADOR */
function inicializar(){
    var offset = 0;
    
    numeroEstudiantesInfo();
    mostrarObservacionesInfo(LIMIT_STUDENTS_TABLE, offset); // Llama a la función para mostrar observaciones
}

 /**FUNCION PARA OBTENER NUMERO DE ESTUDIANTES POR VALIDAR Y MANDAR A CREAR PAGINACION PARA LA VISTA DE LA INFORMACIÓN DEL ESTUDIANTE */
function numeroEstudiantesInfo() {
    $.get("../../controller/coordinador/cantidad-obs-info-est.php", function (e) {
        console.log("Respuesta del servidor:", e); // <-- Agregar esto
        var cantidad_est = parseInt(e.trim(), 10);

        if (isNaN(cantidad_est) || cantidad_est <= 0) {
            console.warn("Número de observaciones no válido:", e);
            return;
        }

        crearPaginacionInfo(cantidad_est);
    }).fail(function () {
        console.error("Error al obtener la cantidad de observaciones.");
    });
}


/**FUNCION PARA CREAR LA PAGINACION PARA LA VISTA DE LOS DOCUMENTOS */
function crearPaginacionInfo(estudiantes) {
    var cantidad_est = parseInt(estudiantes);
    var numero_paginas = Math.ceil(cantidad_est / LIMIT_STUDENTS_TABLE);

    // Validar que numero_paginas sea un número válido y mayor que 0
    if (isNaN(numero_paginas) || numero_paginas <= 0) {
        console.error("Número de páginas no válido:", numero_paginas);
        return; // Detener la ejecución si no es válido
    }

    /**PLUGIN PARA LA CREACION DE PAGINACION RESPONSIVE */
    $('#paginacionInfo').twbsPagination({
        totalPages: numero_paginas,
        visiblePages: 5,
        onPageClick: function (event, page) {
            var offset = (page - 1) * LIMIT_STUDENTS_TABLE;
            mostrarObservacionesInfo(LIMIT_STUDENTS_TABLE, offset); // Llama a la función para mostrar observaciones
        }
    });
}

/**FUNCION PARA MOSTRAR ESTUDIANTES CON PAGINACION PARA LA VISTA DE LOS DOCUMENTOS */
function mostrarObservacionesInfo(limiter, offset) {
    const getData = {
        limit: limiter,
        offset: offset,
        rol: ROL_COORDINADOR
    }
 
    $.get("../../controller/coordinador/lista-info.php", getData, function (e) {
        console.log("Respuesta del backend:", e);
        let estudiantesInfo = JSON.parse(e);
        let template = "";
 
        estudiantesInfo.forEach(estudiantesInfo => {
            template += `
                 <tr user-id="${estudiantesInfo.id_estudiante}">
                     <th>${estudiantesInfo.id_estudiante}</th>
                     <td>${estudiantesInfo.nombres_estudiante} ${estudiantesInfo.apellidos_estudiante}</td>
                     <td>${estudiantesInfo.numero_cuenta}</td>
                     <td>${estudiantesInfo.id_comentario}</td>
                     <td>${estudiantesInfo.comentario}</td>
                 </tr>
             `;
        });
 
        $("#estudiantes-info").html(template);
    });
 }
 

/**BUSCADOR */
$(document).on("click", "#ir-buscar", function(){

   let search = $("#valor-buscar").val();
   const getData = {

       buscador: search,
       rol: ROL_COORDINADOR

   }

   if(search == null || search == 0 || /^\s+$/.test(search)){
       
       inicializar();
       $("#paginacion").show();

   } else {
       
       $.get("../../controller/coordinador/buscar-observaciones.php", getData, function (e) {

           let estudiante = JSON.parse(e);
           let template="";

           estudiante.forEach(estudiante => {
            template +=`
                <tr user-id="${estudiante.id}" scope="row">
                    <th>${estudiante.id}</th>
                    <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                    <td>${estudiante.numero_cuenta_estudiante}</td>
                    <td class="idComentario">${estudiante.id_respuesta_documento}</td>
                    <td class="comentario">${estudiante.descripcion}</td>
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


