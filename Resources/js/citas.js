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
    inicializarTablaExcel();
     
 
 });

 function inicializarTablaExcel(){
    table = $('#tabla-excel-descarga').DataTable( {
        "pageLength": 8,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Citas '+$("#fecha-excel").val(),
                className: 'btn mb-2',
                text: "Descargar Tabla (Excel)",
            }
        ],
        "info": false,
        "searching": false,
        "ordering": false,
        
    } );

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
 
 /**INICIALIZA TABLA Y PAGINADOR */
 function inicializar(){
     var offset = 0;
     
     numeroEstudiantes();                                    //Se manda a obtener el numero de estudiantes que aun no se valida
     mostrarEstudiantes(LIMIT_STUDENTS_TABLE, offset);       //Manda a mostrar los estudinates
 }

 /**FUNCION PARA OBTENER NUMERO DE ESTUDIANTES POR VALIDAR Y MANDAR A CREAR PAGINACION */
function numeroEstudiantes(){
    const getData = {
        rol: ROL_COORDINADOR
    }
    $.get("../../controller/coordinador/cantidad-citas.php", getData, function (e) {
        
        if( e == null || e == 0 || /^\s+$/.test(e) ){
            console.log('null');
        }else{
            crearPaginacion(e);                 //Se crea paginacion solo si se encontrarons estudiantes sin validar
        }
    });
};

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

/**FUNCION PARA MOSTRAR ESTUDIANTES CON PAGINACION */
function mostrarEstudiantes(limiter, offset){

    const getData = {
        limit: limiter,
        offset: offset,
        rol: ROL_COORDINADOR,
        estado_info: ESTADO_INFO_ESTUDIANTE
    }

    $.get("../../controller/coordinador/listar-citas.php", getData, function (e) {
        
            let estudiante = JSON.parse(e);
            let template="";

            estudiante.forEach(estudiante => {
                template +=`
                    <tr user-id="${estudiante.id_estudiante}" scope="row">
                        <th>${estudiante.id_estudiante}</th>
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td class="fecha">${estudiante.fecha}</td>
                        <td>
                            <button class="btn btn-success btn-sm cambiar-cita-user" data-toggle="modal" data-target="#cambiar-cita">
                                Cambiar
                            </button>
                        </td>
                    </tr>
                `
            });
            $("#estudiantes").html(template);
    });
}

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


/**ABRE EL MODAL PARA CAMBIAR CITA DE EL ESTUDIANTE */
$(document).on("click", ".cambiar-cita-user", function(){


    let element = $(this)[0].parentElement.parentElement;       //OBTENEMOS EL ID
    let id = $(element).attr("user-id");

    let element_fecha = $(this)[0].parentElement.parentElement.getElementsByClassName("fecha")[0].innerHTML;
    let cita = element_fecha.split(" ");

    $("#estudiante-id").val(id);
    $("#fecha-cita").val(cita[0]);
    $("#hora-cita").val(cita[1]);



});

/**AQUI SE ENVIA A CAMBIAR EL ESTADO DE LA SOLICITUD A APROBADO EN LA BASE DE DATOS */
$("#enviar-validar-cita").click(function () { 


    document.getElementById('enviar-validar-cita').disabled=true;

    var x = 0;
    var errormsg = "";
    
    const postData = {

        id: $("#estudiante-id").val(),
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
                $.post("../../controller/coordinador/editar-cita.php", postData, function (e) {
                    let respuesta = JSON.parse(e);
                                
                        if(respuesta == "Fallo1"){
                            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err1");
                        }else if(respuesta == "Fallo2"){
                            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo","Err2");
                        }else{
                            toastr["success"]("Se ha cambiado la fecha de la cita");
                            $('#cambiar-cita').modal('hide');
                            $('.modal-backdrop').hide();
                            inicializar();
                        }
                        document.getElementById('enviar-validar-cita').disabled=false;
                        
                });
            }

        });
    }

    
    
});


$(document).on("click", "#abrir-modal-fecha", function(){
    $("#tabla-excel").modal({backdrop: 'static', keyboard: false});
});


/**AQUI SE OBTENE LA TABLA DE CITAS SEGUN LA FECHA INTRODUCIDA PARA GENERAR DESCARGA EN EXCEL */
$(document).on("click", "#obtener-tabla", function(){
    
    /**VALIDAMOS QUE EL CAMPOS DE FECHA ESTE LLENO */
    if( $("#fecha-cita1").val()== null || $("#fecha-cita1").val() == 0 || /^\s+$/.test($("#fecha-cita1").val()) ) {
        document.getElementById("fecha-cita1").className = "form-control is-invalid";
        toastr["warning"]("Debe ingresar una fecha");
    } else{

        document.getElementById("fecha-cita1").className = "form-control";

        const getData = {
            rol: ROL_COORDINADOR, 
            fecha: $("#fecha-cita1").val()
        }

        table.destroy();

        $("#fecha-excel").val(getData.fecha);

        $.get("../../controller/coordinador/lista-citas-excel.php", getData, function (e) {

            
            let estudiante = JSON.parse(e);
            let template="";

            estudiante.forEach(estudiante => {
                template +=`
                    <tr scope="row">
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td class="fecha">${estudiante.fecha}</td>
                    </tr>
                `
            });
            $("#estudiantes-excel").html(template);    

            inicializarTablaExcel();
            

    });

    }

});

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
        
        $.get("../../controller/coordinador/buscar-citas.php", getData, function (e) {

            let estudiante = JSON.parse(e);
            let template="";

            estudiante.forEach(estudiante => {
                template +=`
                    <tr user-id="${estudiante.id_estudiante}" scope="row">
                        <th>${estudiante.id_estudiante}</th>
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td class="fecha">${estudiante.fecha}</td>
                        <td>
                            <button class="btn btn-success btn-sm cambiar-cita-user" data-toggle="modal" data-target="#cambiar-cita">
                                Cambiar
                            </button>
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


