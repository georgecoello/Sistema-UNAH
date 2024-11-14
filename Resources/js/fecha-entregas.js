/**
 * 
 * ESTADO FECHAS DE ENTREGAS
 * 1: ACTIVO
 * 2: INACTIVO
 * 
 */

ROL_COORDINADOR = document.getElementById('coor-rol').getAttribute('rol');                  //ROL DEL USUARIO
NOMBRES_COORDINADOR = document.getElementById('coor-nombre').getAttribute('nombre');    
APELLIDOS_COORDINADOR = document.getElementById('coor-apellido').getAttribute('apellido');  
ID_USER_ACT = document.getElementById('id_user_act').getAttribute('id_user');               //ID DEL USUARIO 

/**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
$(document).ready(function () {
    mostrarFechas();
    estadoswitch();
    estadoswitch1();
    misDatos();
});

 /**FUNCION PARA PAGINACION DE TABLA */
 function Tabla(){
    table = $('#example').DataTable({
        "pageLength": 7,
        "dom": '<"top"f>rt<"bottom"p><"clear">',
        "drawCallback": function( settings ) {
            $('ul.pagination').addClass("pagination-sm");
       }
    });

};

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

/**LISTENERs PARA LOS SWITCH DE ESTADO DE LAS FECHAS DE ENTREGA */
$('#estado-fecha').click(function(){
    estadoswitch();
});

$('#estado-fecha1').click(function(){
    estadoswitch1();
});


/*FUNCIONES PARA LOS CHECKS TOGGLER, DECIR SI ESTA ACTIVO O INACTIVO*/
function estadoswitch(){
    let template = "";
    var isChecked=document.getElementById("estado-fecha").checked;
    if (isChecked){
        template = "Activo";
        $("#estado").html(template);
        return 1;
    } else {
        template = "Inactivo";
        $("#estado").html(template);
        return 2;
    }
    
};

function estadoswitch1(){
    let template = "";
    var isChecked=document.getElementById("estado-fecha1").checked;
    if (isChecked){
        template = "Activo";
        $("#estado1").html(template);
        return 1;
    } else {
        template = "Inactivo";
        $("#estado1").html(template);
        return 2;
    }
    
};


/*FUNCION PARA MOSTRAR TODOS LOS PERIODOS DE ENTREGA EN LA TABLA */
function mostrarFechas(){
    $.ajax({
        url: "../../controller/usuarios/listar-fecha-entregas.php",
        type: "GET",
        success: function (response) {
            
            let fecha = JSON.parse(response);
            let template ="";
            fecha.forEach(fecha => {

                var estado = 1;

                if (fecha.estado == 1){
                    fecha.estado = `<span class="badge badge-success">Activo</span>`;
                } else if(fecha.estado == 2){
                    estado = 2;
                    fecha.estado = `<span class="badge badge-light">inactivo</span>`;
                }

                template += `
                    <tr fecha-id="${fecha.id}" scope="row">
                        <th>${fecha.id}</th>
                        <td class='inicio'>${fecha.inicio}</td>
                        <td class='fin'>${fecha.fin}</td>
                        <td class='estado-periodo' estado-periodo='${estado}'>${fecha.estado}</td>
                        <td>
                            <button class="edit-fecha btn btn-warning btn-sm" data-toggle="modal" data-target="#edit-periodo">
                                Editar
                            </button>
                        </td>
                    </tr>
                `
            });
            $("#usuarios").html(template);
            Tabla();
        }
    });
};


/*FUNCION PARA VALIDAR Y GUARDAR EL NUEVO PERIODO DE ENTREGA*/
$("#add-periodo-form").submit(function (e) {
    document.getElementById('subm-add').disabled=true;
    e.preventDefault();
    var x = 0;
    var errormsg = "";

    const postData = {
        fecha_inicio: $("#fecha-inicio").val()+"T"+$("#hora-inicio").val(),
        fecha_fin: $("#fecha-fin").val()+"T"+$("#hora-fin").val(),
        estado: estadoswitch()
    };


    /**VALIDAMOS QUE LOS CAMPOS DE FECHA Y HORA DE INICIO ESTEN LLENOS */
    if( $("#fecha-inicio").val()== null || $("#fecha-inicio").val() == 0 || /^\s+$/.test($("#fecha-inicio").val()) ) {
        document.getElementById("fecha-inicio").className = "form-control is-invalid";
        errormsg += "Debe ingresar fecha de inicio <br>";
        x = x+1;
    } else{
        document.getElementById("fecha-inicio").className = "form-control";
    }

    if( $("#hora-inicio").val()== null || $("#hora-inicio").val() == 0 || /^\s+$/.test($("#hora-inicio").val()) ) {
        document.getElementById("hora-inicio").className = "form-control is-invalid";
        errormsg += "Debe ingresar hora de inicio <br>";
        x = x+1;
    } else{
        document.getElementById("hora-inicio").className = "form-control";
    }


    /**VALIDAMOS QUE LOS CAMPOS DE FECHA Y HORA DE FIN ESTEN LLENOS */
    if( $("#fecha-fin").val()== null || $("#fecha-fin").val() == 0 || /^\s+$/.test($("#fecha-fin").val()) ) {
        document.getElementById("fecha-fin").className = "form-control is-invalid";
        errormsg += "Debe ingresar fecha de fin <br>";
        x = x+1;
    } else{
        document.getElementById("fecha-fin").className = "form-control";
    }

    if( $("#hora-fin").val()== null || $("#hora-fin").val() == 0 || /^\s+$/.test($("#hora-fin").val()) ) {
        document.getElementById("hora-fin").className = "form-control is-invalid";
        errormsg += "Debe ingresar hora de fin <br>";
        x = x+1;
    } else{
        document.getElementById("hora-fin").className = "form-control";
    }
    
    
        
    /**VALIDA QUE TODOS LOS CAMPOS ESTEN LLENOS Y VALIDADOS */
    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('subm-add').disabled=false;
    } else{
       
        /**VALIDAR QUE LA FECHA DE INICIO NO SEA MAYOR A LA DE FIN */
        var fecha_inicio = $("#fecha-inicio").val().split("-");
        var fecha_fin = $("#fecha-fin").val().split("-");

        var hora_inicio = $("#hora-inicio").val().split(":");
        var hora_fin = $("#hora-fin").val().split(":");

        var dateStart = new Date(fecha_inicio[0],(fecha_inicio[1]-1),fecha_inicio[2], hora_inicio[0], hora_inicio[1], 0);
        var dateEnd = new Date(fecha_fin[0],(fecha_fin[1]-1),fecha_fin[2], hora_fin[0], hora_fin[1], 0);

        if (dateStart>dateEnd){
            toastr["warning"]("La fecha y hora de inicio no puede ser mayor a la fecha y hora de fin.");
            document.getElementById('subm-add').disabled=false;
        }else{
            
            $.post("../../controller/usuarios/agregar-periodo-entrega.php", postData, function (response) {
                let respuesta = JSON.parse(response);
                /**VALIDA QUE SE HAYAN INSERTADO EL NUEVO PERIODO */
                if (respuesta[0].estado){
                    table.destroy();
                    mostrarFechas();
                    $("#add-periodo-form").trigger("reset");
                    $('#add-fechas').modal('hide');
                    $('.modal-backdrop').hide();
                    toastr["success"](respuesta[0].mensaje);
                    estadoswitch();
                    document.getElementById('subm-add').disabled=false;


                } else {

                    toastr["warning"](respuesta[0].mensaje);
                    estadoswitch();
                    document.getElementById('subm-add').disabled=false;
                }
                
            });

        }
        
        
    }

});


/*FUNCION PARA VALIDAR Y EDITAR UN USUARIO */
$("#edit-periodo-form").submit(function(e){
    document.getElementById('subm-edit').disabled=true;
    e.preventDefault();
    var x = 0;
    var errormsg = "";

    const postData = {
        fecha_inicio: $("#fecha-inicio1").val()+"T"+$("#hora-inicio1").val(),
        fecha_fin: $("#fecha-fin1").val()+"T"+$("#hora-fin1").val(),
        estado: estadoswitch1(),
        id: $("#fecha-id").val()
    };


    /**VALIDAMOS QUE LOS CAMPOS DE FECHA Y HORA DE INICIO ESTEN LLENOS */
    if( $("#fecha-inicio1").val()== null || $("#fecha-inicio1").val() == 0 || /^\s+$/.test($("#fecha-inicio1").val()) ) {
        document.getElementById("fecha-inicio1").className = "form-control is-invalid";
        errormsg += "Debe ingresar fecha de inicio <br>";
        x = x+1;
    } else{
        document.getElementById("fecha-inicio1").className = "form-control";
    }

    if( $("#hora-inicio1").val()== null || $("#hora-inicio1").val() == 0 || /^\s+$/.test($("#hora-inicio1").val()) ) {
        document.getElementById("hora-inicio1").className = "form-control is-invalid";
        errormsg += "Debe ingresar hora de inicio <br>";
        x = x+1;
    } else{
        document.getElementById("hora-inicio1").className = "form-control";
    }


    /**VALIDAMOS QUE LOS CAMPOS DE FECHA Y HORA DE FIN ESTEN LLENOS */
    if( $("#fecha-fin1").val()== null || $("#fecha-fin1").val() == 0 || /^\s+$/.test($("#fecha-fin1").val()) ) {
        document.getElementById("fecha-fin1").className = "form-control is-invalid";
        errormsg += "Debe ingresar fecha de fin <br>";
        x = x+1;
    } else{
        document.getElementById("fecha-fin1").className = "form-control";
    }

    if( $("#hora-fin1").val()== null || $("#hora-fin1").val() == 0 || /^\s+$/.test($("#hora-fin1").val()) ) {
        document.getElementById("hora-fin1").className = "form-control is-invalid";
        errormsg += "Debe ingresar hora de fin <br>";
        x = x+1;
    } else{
        document.getElementById("hora-fin1").className = "form-control";
    }
    
    
        
    /**VALIDA QUE TODOS LOS CAMPOS ESTEN LLENOS Y VALIDADOS */
    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('subm-edit').disabled=false;
    } else{
       
        /**VALIDAR QUE LA FECHA DE INICIO NO SEA MAYOR A LA DE FIN */
        var fecha_inicio = $("#fecha-inicio1").val().split("-");
        var fecha_fin = $("#fecha-fin1").val().split("-");

        var hora_inicio = $("#hora-inicio1").val().split(":");
        var hora_fin = $("#hora-fin1").val().split(":");

        var dateStart = new Date(fecha_inicio[0],(fecha_inicio[1]-1),fecha_inicio[2], hora_inicio[0], hora_inicio[1], 0);
        var dateEnd = new Date(fecha_fin[0],(fecha_fin[1]-1),fecha_fin[2], hora_fin[0], hora_fin[1], 0);

        if (dateStart>dateEnd){
            toastr["warning"]("La fecha y hora de inicio no puede ser mayor a la fecha y hora de fin.");
            document.getElementById('subm-edit').disabled=false;
        }else{
            
            $.post("../../controller/usuarios/editar-periodo-entregas.php", postData, function (response) {
                let respuesta = JSON.parse(response);
                /**VALIDA QUE SE HAYAN INSERTADO EL NUEVO PERIODO */
                if (respuesta[0].estado){
                    table.destroy();
                    mostrarFechas();
                    $("#edit-periodo-form").trigger("reset");
                    $('#edit-periodo').modal('hide');
                    $('.modal-backdrop').hide();
                    toastr["success"](respuesta[0].mensaje);
                    estadoswitch1();
                    document.getElementById('subm-edit').disabled=false;


                } else {

                    toastr["warning"](respuesta[0].mensaje);
                    estadoswitch1();
                    document.getElementById('subm-edit').disabled=false;
                }
                
            });

        }
        
        
    }

    
});


/**FUNCION PARA MOSTRAR LOS DATOS DEL USUARIO QUE SE VA A EDITAR EN MODAL */
$(document).on("click", ".edit-fecha", function(){

    

    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("fecha-id");

    let element_fecha_inicio = $(this)[0].parentElement.parentElement.getElementsByClassName("inicio")[0].innerHTML;
    let fecha_inicio = element_fecha_inicio.split(" ");

    let element_fecha_fin = $(this)[0].parentElement.parentElement.getElementsByClassName("fin")[0].innerHTML;
    let fecha_fin = element_fecha_fin.split(" ");

    let element_estado = $(this)[0].parentElement.parentElement.getElementsByClassName("estado-periodo")[0];
    let estado = $(element_estado).attr("estado-periodo");

    $("#fecha-id").val(id);

    $("#fecha-inicio1").val(fecha_inicio[0]);
    $("#hora-inicio1").val(fecha_inicio[1]);

    $("#fecha-fin1").val(fecha_fin[0]);
    $("#hora-fin1").val(fecha_fin[1]);

    if (estado==1) {
        document.getElementById("estado-fecha1").checked = true;
        template = "Activo";
        $("#estado1").html(template);
    }
    
    if (estado==2) {
        document.getElementById("estado-fecha1").checked = false;
        template = "Inactivo";
        $("#estado1").html(template);
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



