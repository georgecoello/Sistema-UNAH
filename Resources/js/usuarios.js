

ROL_COORDINADOR = document.getElementById('coor-rol').getAttribute('rol');                  //ROL DEL USUARIO
NOMBRES_COORDINADOR = document.getElementById('coor-nombre').getAttribute('nombre');    
APELLIDOS_COORDINADOR = document.getElementById('coor-apellido').getAttribute('apellido');  
ID_USER_ACT = document.getElementById('id_user_act').getAttribute('id_user');               //ID DEL USUARIO 

/**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
$(document).ready(function () {
    mostrarUsuarios();
    rolesSelect();
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

/**LISTENERs PARA LOS SWITCH DE ESTADO DEL USUARIO */
$('#estado-usuario').click(function(){
    estadoswitch();
});

$('#estado-usuario1').click(function(){
    estadoswitch1();
});


/*FUNCIONES PARA LOS CHECKS TOGGLER, DECIR SI ESTA ACTIVO O INACTIVO*/
function estadoswitch(){
    let template = "";
    var isChecked=document.getElementById("estado-usuario").checked;
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
    var isChecked=document.getElementById("estado-usuario1").checked;
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


/*FUNCION PARA LLENAR EL SELECT CON LOS ROLES (EN CREACION DE USUARIO)*/
function rolesSelect() {
    $.ajax({
        url: "../../controller/usuarios/listar-roles.php",
        type: "GET",
        success: function (response) {
            let rol = JSON.parse(response);
            let template =`<option selected="true" disabled="disabled" value="">Seleccione Rol</option>"`;

            rol.forEach(rol => {
                template += `
                <option value="${rol.id_rol}">${rol.nombre_rol}</option>
                `
            });
            $("#rol-usuario").html(template);
            $("#rol-usuario1").html(template);

        }
    })
};


/*FUNCION PARA MOSTRAR TODOS LOS USUARIOS EN LA TABLA */
function mostrarUsuarios(){
    $.ajax({
        url: "../../controller/usuarios/listar-usuarios.php",
        type: "GET",
        success: function (response) {
            
            let usuario = JSON.parse(response);
            let template ="";
            usuario.forEach(usuario => {

                if (usuario.estado_usuario == 1){
                    usuario.estado_usuario = `<span class="badge badge-success">Activo</span>`;
                } else if(usuario.estado_usuario == 2){
                    usuario.estado_usuario = `<span class="badge badge-light">inactivo</span>`;
                }

                template += `
                    <tr user-id="${usuario.id_usuario}" scope="row">
                        <th>${usuario.id_usuario}</th>
                        <td>${usuario.nombres_usuario} ${usuario.apellidos_usuario}</td>
                        <td>${usuario.correo_usuario}</td>
                        <td>${usuario.nombre_rol}</td>
                        <td>${usuario.estado_usuario}</td>
                        <td>
                            <button class="edit-user btn btn-warning btn-sm" data-toggle="modal" data-target="#edit-user">
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


/*FUNCION PARA VALIDAR Y GUARDAR EL NUEVO USUARIO */
$("#add-user-form").submit(function (e) {
    document.getElementById('subm-add').disabled=true;
    e.preventDefault();
    var x = 0;
    var errormsg = "";

    const postData = {
        nombres: $("#nombres").val(),
        apellidos: $("#apellidos").val(),
        correo: $("#correo").val(),
        rol: $("#rol-usuario").val(),
        pass: generatePasswordRand(8),
        estado: estadoswitch()
    };

    /*VALIDACION DE QUE LOS CAMPOS NO VENGAN VACIOS */
    
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

    if( postData.correo == null || postData.correo.length == 0 || /^\s+$/.test(postData.correo) ) {
        document.getElementById("correo").className = "form-control is-invalid";
        errormsg += "Debe ingresar correo electronico  <br>";
        x = x+1;
    } else{
        document.getElementById("correo").className = "form-control";
    }
    
    if( postData.rol == null || postData.rol.length == 0 || /^\s+$/.test(postData.rol) ) {
        document.getElementById("rol-usuario").style.border="1px solid #f00";
        errormsg += "Debe seleccionar un rol  <br>";
        x = x+1;
    } else{
        document.getElementById("rol-usuario").style.border="1px solid #ced4da";
    }

    if( postData.estado == null || postData.estado.length == 0 || /^\s+$/.test(postData.estado) ) {
        errormsg += "Debe seleccionar un estado  <br>";
        x = x+1;
    } 

    /*VALIDACION DEL DOMINIO DEL CORREO ELECTRONICO */

    if (!(/^[a-zA-Z0-9._-]+@[unah.edu.hn]+$/.test(postData.correo))){
        document.getElementById("correo").className = "form-control is-invalid";
        errormsg += "El correo debe ser de dominio unah.edu.hn <br>";
        x = x+1;
    } else{
        document.getElementById("correo").className = "form-control";
    }
    
    
    
    
        
    /**VALIDA QUE TODOS LOS CAMPOS ESTEN LLENOS Y VALIDADOS */
    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('subm-add').disabled=false;
    } else{
        $.post("../../controller/usuarios/validar-correo.php", postData, function (e) {

            /**VALIDA QUE EL CORREO NO ESTE UTILIZADO POR OTRA CUENTA */
            if (e){
                document.getElementById("correo").className = "form-control";
                $.post("../../controller/usuarios/agregar-usuario.php", postData, function (response) {
                    let respuesta = JSON.parse(response);
                    /**VALIDA QUE SE HAYAN INSERTADO EL NUEVO USUARIO */
                    if (respuesta[0].estado){
                        table.destroy();
                        mostrarUsuarios();
                        $("#add-user-form").trigger("reset");
                        $('#add-user').modal('hide');
                        $('.modal-backdrop').hide();
                        toastr["success"](respuesta[0].mensaje);
                        estadoswitch();
                        document.getElementById('subm-add').disabled=false;

                        /**SE ENVIA EL CORREO CON LA COTRASEÑA */

                        $.post("../../controller/usuarios/enviar-correo.php", postData, function(response){
                            toastr["warning"](response);
                        });


                    } else {
                        table.destroy();
                        mostrarUsuarios();
                        toastr["warning"](respuesta[0].mensaje);
                        estadoswitch();
                        document.getElementById('subm-add').disabled=false;
                    }
                    
                });
            } else {
                document.getElementById("correo").className = "form-control is-invalid";
                toastr["warning"]("Ya existe un usuario con esa cuenta de correo.");
                document.getElementById('subm-add').disabled=false;
            }
        });

        
        
    }

});

/*FUNCION PARA VALIDAR Y EDITAR UN USUARIO */
$("#edit-user-form").submit(function(e){
    document.getElementById('subm-edit').disabled=true;
    e.preventDefault();
    var x = 0;
    var errormsg = "";

    const postData = {
        id: $("#user-id1").val(),
        nombres: $("#nombres1").val(),
        apellidos: $("#apellidos1").val(),
        correo: $("#correo1").val(),
        rol: $("#rol-usuario1").val(),
        estado: estadoswitch1()
    };

    /*VALIDACION DE QUE LOS CAMPOS NO VENGAN VACIOS */
    if( postData.nombres == null || postData.nombres.length == 0 || /^\s+$/.test(postData.nombres) ) {
        document.getElementById("nombres1").className = "form-control is-invalid";
        errormsg += "Debe ingresar nombres  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN LETRAS */
        if (!(/^[a-zA-Z áéíóúñüàè]+$/.test(postData.nombres))){
            document.getElementById("nombres1").className = "form-control is-invalid";
            errormsg += "Solo se aceptan letras en nombres <br>";
            x = x+1;
        } else{
            document.getElementById("nombres1").className = "form-control";
        }
    }


    if( postData.apellidos == null || postData.apellidos.length == 0 || /^\s+$/.test(postData.apellidos) ) {
        document.getElementById("apellidos1").className = "form-control is-invalid";
        errormsg += "Debe ingresar apellidos  <br>";
        x = x+1;
    } else{
        /**VALIDA QUE SOLO VAYAN LETRAS */
        if (!(/^[a-zA-Z áéíóúñüàè]+$/.test(postData.apellidos))){
            document.getElementById("apellidos1").className = "form-control is-invalid";
            errormsg += "Solo se aceptan letras en apellidos <br>";
            x = x+1;
        } else{
            document.getElementById("apellidos1").className = "form-control";
        }
    }

    if( postData.correo == null || postData.correo.length == 0 || /^\s+$/.test(postData.correo) ) {
        document.getElementById("correo1").className = "form-control is-invalid";
        errormsg += "Debe ingresar correo electronico  <br>";
        x = x+1;
    } else{
        document.getElementById("correo1").className = "form-control";
    }
    
    if( postData.rol == null || postData.rol.length == 0 || /^\s+$/.test(postData.rol) ) {
        document.getElementById("rol-usuario1").style.border="1px solid #f00";
        errormsg += "Debe seleccionar un rol  <br>";
        x = x+1;
    } else{
        document.getElementById("rol-usuario1").style.border="1px solid #ced4da";
    }

    if( postData.estado == null || postData.estado.length == 0 || /^\s+$/.test(postData.estado) ) {
        errormsg += "Debe seleccionar un estado  <br>";
        x = x+1;
    } 

    /*VALIDACION DEL DOMINIO DEL CORREO ELECTRONICO */

    if (!(/^[a-zA-Z0-9._-]+@[unah.edu.hn]+$/.test(postData.correo))){
        document.getElementById("correo1").className = "form-control is-invalid";
        errormsg += "El correo debe ser de dominio unah.edu.hn <br>";
        x = x+1;
    } else{
        document.getElementById("correo1").className = "form-control";
    }

    /**VALIDA QUE TODOS LOS CAMPOS ESTEN LLENOS Y VALIDADOS */
    if (x > 0){
        toastr["warning"](errormsg);
        document.getElementById('subm-edit').disabled=false;
    } else{
        $.post("../../controller/usuarios/editar-usuario.php", postData, function (response) {
            let respuesta = JSON.parse(response);
            if (respuesta[0].estado){
                table.destroy();
                mostrarUsuarios();
                $("#edit-user-form").trigger("reset");
                $('#edit-user').modal('hide');
                $('.modal-backdrop').hide();
                toastr["success"](respuesta[0].mensaje);
                document.getElementById('subm-edit').disabled=false;
            } else {
                table.destroy();
                mostrarUsuarios();
                toastr["warning"](respuesta[0].mensaje);
                document.getElementById('subm-edit').disabled=false;
            }
            
        });
        
    }

    
});


/*FUNCION PARA CREAR UNA CONTRASEÑA ALEATORIA PARA EL USUARIO */
function generatePasswordRand(length,type) {
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


/**FUNCION PARA MOSTRAR LOS DATOS DEL USUARIO QUE SE VA A EDITAR EN MODAL */
$(document).on("click", ".edit-user", function(){

    

    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("user-id");

    $.post("../../controller/usuarios/single-usuario.php", { id }, function (response) {
        let usuario = JSON.parse(response) 
        $("#user-id1").val(usuario.id);
        $("#nombres1").val(usuario.nombres);
        $("#apellidos1").val(usuario.apellidos);
        $("#correo1").val(usuario.correo);
        $("#rol-usuario1").val(usuario.rol);

        if (usuario.estado==1) {
            document.getElementById("estado-usuario1").checked = true;
            template = "Activo";
            $("#estado1").html(template);
        }
        
        if (usuario.estado==2) {
            document.getElementById("estado-usuario1").checked = false;
            template = "Inactivo";
            $("#estado1").html(template);
        }
    });

});


/**FUNCION PARA EL REENVIO DE LA CONTRASEÑA AL CORREO ELCTRONICO */
$(document).on("click", ".reenviar", function(){

    let id = $("#user-id1").val();
    $correo=  $("#correo1").val();

    $.post("../../controller/usuarios/obtener-pass.php", { id }, function(e){

        const postData = {
            correo: $correo,
            pass: e
        };

        $.post("../../controller/usuarios/enviar-correo.php", postData, function(response){
            toastr["warning"](response);
        });

    });

})

$(document).on("click", ".salir", function(){

    console.log('me salgo');
    

})


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



