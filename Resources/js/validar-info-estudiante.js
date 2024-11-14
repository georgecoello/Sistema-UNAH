/**
 * ESTADOS INFO DE ESTUDIANTE
 * 
 * 1: REVISADA (APROBADA)
 * 2: SIN REVISAR
 * 3: REVISADA (NO APROBADA)
 * 4: SIN REVISAR (REPETIDA)
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

/**INICIALIZA TABLA Y PAGINADOR */
function inicializar(){
    var offset = 0;
    
    numeroEstudiantes();                                    //Se manda a obtener el numero de estudiantes que aun no se valida
    mostrarEstudiantes(LIMIT_STUDENTS_TABLE, offset);       //Manda a mostrar los estudinates
}

/**FUNCION PARA OBTENER NUMERO DE ESTUDIANTES POR VALIDAR Y MANDAR A CREAR PAGINACION */
function numeroEstudiantes(){
    const getData = {
        rol: ROL_COORDINADOR,
        estado_info: ESTADO_INFO_ESTUDIANTE
    }
    $.get("../../controller/coordinador/cantidad-sinvalidar.php", getData, function (e) {
        
        if( e == null || e == 0 || /^\s+$/.test(e) ){
            console.log('null');
        }else{
            crearPaginacion(e);                 //Se crea paginacion solo si se encontrarons estudiantes sin validar
        }
        
        var text = 'Estudiantes por validar:&nbsp;&nbsp;&nbsp;&nbsp;'+e;
        document.getElementById("numero-estudiantes").innerHTML = text;         //Se manda a pintar la cantidad de estudiantes sin validar
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

    $.get("../../controller/coordinador/listar-sinvalidar.php", getData, function (e) {
        
            let estudiante = JSON.parse(e);
            let template="";

            estudiante.forEach(estudiante => {
                template +=`
                    <tr user-id="${estudiante.id_estudiante}" scope="row">
                        <th>${estudiante.id_estudiante}</th>
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td>
                            <button class="btn btn-success btn-sm verificar-user" data-toggle="modal" data-target="#verificar-user">
                                Validar
                            </button>
                        </td>
                    </tr>
                `
            });
            $("#estudiantes").html(template);
    });
}


/**BUSCADOR */
$(document).on("click", "#ir-buscar", function(){

    let search = $("#valor-buscar").val();
    const getData = {

        buscador: search,
        rol: ROL_COORDINADOR,
        estado_info: ESTADO_INFO_ESTUDIANTE

    }

    if(search == null || search == 0 || /^\s+$/.test(search)){
        
        inicializar();
        $("#paginacion").show();

    } else {
        
        $.get("../../controller/coordinador/buscar-sinvalidar.php", getData, function (e) {
            let estudiante = JSON.parse(e);
            let template="";

            estudiante.forEach(estudiante => {
                template +=`
                    <tr user-id="${estudiante.id_estudiante}" scope="row">
                        <th>${estudiante.id_estudiante}</th>
                        <td>${estudiante.nombres_estudiante} ${estudiante.apellidos_estudiante}</td>
                        <td>${estudiante.numero_cuenta}</td>
                        <td>
                            <button class="btn btn-success btn-sm verificar-user" data-toggle="modal" data-target="#verificar-user">
                                Validar
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


/**ABRE EL MODAL PARA VALIDAR LA INFORMACION DE EL ESTUDIANTE */
$(document).on("click", ".verificar-user", function(){

    document.getElementById("comentario").className = "form-control";

    let element = $(this)[0].parentElement.parentElement;       //OBTENEMOS EL ID
    let id = $(element).attr("user-id");

    $.post("../../controller/coordinador/single-sinvalidar.php", { id }, function (e) {
        let estudiante = JSON.parse(e);

        if(estudiante == "Fallo"){

            toastr["warning"]("UPS! Ha ocurrido un error.");

        } else{

            $("#estudiante-id").val(estudiante.id);
            $("#nombres").val(estudiante.nombres);
            $("#apellidos").val(estudiante.apellidos);
            $("#cuenta").val(estudiante.cuenta);
            $("#identidad").val(estudiante.identidad);
            $("#correo").val(estudiante.correo);
            $("#carrera").val(estudiante.carrera);

            var excelencia = estudiante.excelencia; 

            if (excelencia == "1"){
                $("#excelencia").val("Si");
            } else {
                $("#excelencia").val("No");
            }

            document.getElementById('customRadio1').checked=true;   //HACEMOS QUE SIEMPRE QUE SE ABRA EL MODAL ESTE SELECCIONADO EL SI EN SI LA INFORMACION ESTA CORRECTA
            SiValidar();

        
        }
    })
    

});


/**LISTENER PARA UNO DE LOS RADIOBUTTON */
$(document).on("click", "#customRadio1", function(){

    SiValidar();
    
});

/**LISTENER PARA UNO DE LOS RADIOBUTTON */
$(document).on("click", "#customRadio2", function(){

    NoValidar();
    
});


/**MANDAR A RECTIFICAR LA INFORMACION DEL ESTUDIANTE */
$(document).on("click", "#no-validar", function(){

    document.getElementById('no-validar').disabled=true;
    
    var x = 0;
    var errormsg = "";

    const postData = {
        id: $("#estudiante-id").val(),
        comentario: $("#comentario").val()
    };


    if( postData.comentario == null || postData.comentario.length == 0 || /^\s+$/.test(postData.comentario) ) {
        document.getElementById("comentario").className = "form-control is-invalid";
        errormsg += "Debe ingresar el por que esta mal la informacion del estudiante  <br>";
        x = x+1;
    } else{
        document.getElementById("comentario").className = "form-control";
    }
    
    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('no-validar').disabled=false;
    }else{

        $.post("../../controller/coordinador/rectificar-info.php", postData, function (e){
            let respuesta = JSON.parse(e);
            if(respuesta == "Hecho"){
                toastr["success"]("Se ha mandado a rectificar la informacion del estudiante");
                $("#validar-info").trigger("reset");
                $('#verificar-user').modal('hide');
                $('.modal-backdrop').hide();
                inicializar();
                document.getElementById('no-validar').disabled=false;
            } else {
                toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo");
                document.getElementById('no-validar').disabled=false;
            }

        });
    }
});


/**VALIDAR LA INFORMACION DE EL ESTUDIANTE */
$(document).on("click", "#si-validar", function(){

    document.getElementById('si-validar').disabled=true;

    var id = $("#estudiante-id").val();

    $.post("../../controller/coordinador/validar-info.php", { id }, function (e){
        let respuesta = JSON.parse(e);
        if(respuesta == "Hecho"){
            toastr["success"]("Se ha validado la informacion de el estudiante");
            $("#validar-info").trigger("reset");
            $('#verificar-user').modal('hide');
            $('.modal-backdrop').hide();

            
            $.post("../../controller/coordinador/single-sinvalidar.php", { id }, function (e) {
                let estudiante = JSON.parse(e);
        
                if(estudiante == "Fallo"){
        
                    toastr["warning"]("UPS! Ha ocurrido un error al obtener datos de estudiante para crear archivos para la creacion de documentos.");
                    document.getElementById('si-validar').disabled=false;
        
                } else{

                    const datosArchivo = {
                        id: id,
                        estudiante: estudiante.nombres + " " + estudiante.apellidos,
                        excelencia: estudiante.excelencia,
                        carrera: estudiante.carrera,
                        coordinador: NOMBRES_COORDINADOR + ' '+ APELLIDOS_COORDINADOR,
                        cuenta: estudiante.cuenta,
                        rol_coordinador: ROL_COORDINADOR
                    }
        
                    $.post("../../controller/coordinador/crear-documento-estudiante.php", datosArchivo, function (e) {

                        let respuesta = JSON.parse(e);
                        if(respuesta == "problema1"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err1');

                        }else if(respuesta == "problema2"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err2');

                        }else if(respuesta == "problema3"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err3');

                        }else if(respuesta == "problema4"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err4');

                        }else if(respuesta == "problema5"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err5');

                        }else if(respuesta == "problema6"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err6');

                        }else if(respuesta == "problema7"){
                            toastr["warning"]("UPS! Ha ocurrido un error al crear documentos del estudiante",'Err7');

                        }else {
                            toastr["success"]("Se han creado los documentos generados por el sistema con los datos del estudiante");

                        }

                        document.getElementById('si-validar').disabled=false;
                            
                    });
                
                }
            })

            inicializar();
        
        
        
        }else {
            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo");
            document.getElementById('si-validar').disabled=false;
        }
    });
    
    
});


/**FUNCION PARA HABILITAR EL BOTON DE VALIDACION DE INFORMACION */
function SiValidar() {
    document.getElementById('no-validar').style.display = 'none';
    document.getElementById('comentario').disabled=true;
    document.getElementById('si-validar').style.display = 'inline';
    
}

/**FUNCION PARA HABILITAR EL BOTON DE RECTIFICACION DE INFORMACION */
function NoValidar(){
    document.getElementById('si-validar').style.display = 'none';
    document.getElementById('comentario').disabled=false;
    document.getElementById('no-validar').style.display = 'inline';

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