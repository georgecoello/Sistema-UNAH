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
     mostrarDocumentos();
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
 
 /**LISTENERs PARA LOS SWITCH DE ESTADO DE LOS DOCUMENTOS */
 $('#estado-doc').click(function(){
     estadoswitch();
 });
 
 $('#estado-doc1').click(function(){
     estadoswitch1();
 });
 
 
 /*FUNCIONES PARA LOS CHECKS TOGGLER, DECIR SI ESTA ACTIVO O INACTIVO*/
 function estadoswitch(){
     let template = "";
     var isChecked=document.getElementById("estado-doc").checked;
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
     var isChecked=document.getElementById("estado-doc1").checked;
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
 function mostrarDocumentos(){
     $.ajax({
         url: "../../controller/coordinador/listar-otros-docs.php",
         type: "GET",
         data: {rol: ROL_COORDINADOR},
         success: function (response) {
             
             let docs = JSON.parse(response);

            if( docs !== "fallo"){
                let template ="";
                docs.forEach(doc => {
    
                    var estado =1;
    
                    if (doc.estado == 1){
                        doc.estado = `<span class="badge badge-success">Activo</span>`;
                    } else if(doc.estado == 2){
                        estado = 2;
                        doc.estado = `<span class="badge badge-light">inactivo</span>`;
                    }
    
                    template += `
                        <tr doc-id="${doc.id}" scope="row">
                            <th>${doc.id}</th>
                            <td class='nombre-doc'>${doc.nombre}</td>
                            <td class='estado-doc' estado-doc='${estado}'>${doc.estado}</td>
                            <td>
                                <button class="edit-doc btn btn-warning btn-sm" data-toggle="modal" data-target="#edit-doc">
                                    Editar
                                </button>
                            </td>
                        </tr>
                    `
                });
                $("#documentos").html(template);
                Tabla();
            }

             
         }
     });
 };
 
 
 /*FUNCION PARA VALIDAR Y GUARDAR EL NUEVO PERIODO DE ENTREGA*/
 $("#add-doc-form").submit(function (e) {

    document.getElementById('subm-add').disabled=true;
    e.preventDefault();
    var x = 0;
    var errormsg = "";
 
    const postData = {
        nombre: $("#nombre-doc").val(),
        estado: estadoswitch(),
        rol: ROL_COORDINADOR
    };
 
    /*VALIDACION DE QUE LOS CAMPOS NO VENGAN VACIOS */
    if( postData.nombre == null || postData.nombre.length == 0 || /^\s+$/.test(postData.nombres) ) {
        document.getElementById("nombre-doc").className = "form-control is-invalid";
        errormsg += "Debe ingresar nombre del documento  <br>";
        x = x+1;
    } else{
        document.getElementById("nombre-doc").className = "form-control";
        
    }
    
    if( postData.estado == null || postData.estado.length == 0 || /^\s+$/.test(postData.estado) ) {
        errormsg += "Debe seleccionar un estado  <br>";
        x = x+1;
    } 
     
         
     /**VALIDA QUE TODOS LOS CAMPOS ESTEN LLENOS Y VALIDADOS */
     if (x > 0){
         toastr["warning"](errormsg);
         document.getElementById('subm-add').disabled=false;

     } else{
             
        $.post("../../controller/coordinador/agregar-otro-documento.php", postData, function (response) {
                let respuesta = JSON.parse(response);
                /**VALIDA QUE SE HAYAN INSERTADO EL NUEVO PERIODO */
                if (respuesta[0].estado){
                    table.destroy();
                    mostrarDocumentos();
                    $("#add-doc-form").trigger("reset");
                    $('#add-doc').modal('hide');
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
 
});
 
 
 /*FUNCION PARA VALIDAR Y EDITAR UN USUARIO */
$("#edit-doc-form").submit(function(e){
    document.getElementById('subm-edit').disabled=true;
    e.preventDefault();
    var x = 0;
    var errormsg = "";
 
    const postData = {
        id: $("#doc-id").val(),
        nombre: $("#nombre-doc1").val(),
        estado: estadoswitch1(),
        rol: ROL_COORDINADOR
    };
 
    /*VALIDACION DE QUE LOS CAMPOS NO VENGAN VACIOS */
    if( postData.nombre == null || postData.nombre.length == 0 || /^\s+$/.test(postData.nombres) ) {
        document.getElementById("nombre-doc1").className = "form-control is-invalid";
        errormsg += "Debe ingresar nombre del documento  <br>";
        x = x+1;
    } else{
        document.getElementById("nombre-doc1").className = "form-control";
        
    }
    
    if( postData.estado == null || postData.estado.length == 0 || /^\s+$/.test(postData.estado) ) {
        errormsg += "Debe seleccionar un estado  <br>";
        x = x+1;
    } 
     
         
     /**VALIDA QUE TODOS LOS CAMPOS ESTEN LLENOS Y VALIDADOS */
     if (x > 0){
         toastr["warning"](errormsg);
         document.getElementById('subm-edit').disabled=false;

     } else{
             
        $.post("../../controller/coordinador/editar-otro-documento.php", postData, function (response) {
                let respuesta = JSON.parse(response);
                /**VALIDA QUE SE HAYAN INSERTADO EL NUEVO PERIODO */
                if (respuesta[0].estado){
                    table.destroy();
                    mostrarDocumentos();
                    $("#edit-doc-form").trigger("reset");
                    $('#edit-doc').modal('hide');
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
 
     
 });
 
 
 /**FUNCION PARA MOSTRAR LOS DATOS DEL USUARIO QUE SE VA A EDITAR EN MODAL */
 $(document).on("click", ".edit-doc", function(){
 
     
 
     let element = $(this)[0].parentElement.parentElement;
     let id = $(element).attr("doc-id");
 
     let element_nombre_doc = $(this)[0].parentElement.parentElement.getElementsByClassName("nombre-doc")[0].innerHTML;

 
     let element_estado = $(this)[0].parentElement.parentElement.getElementsByClassName("estado-doc")[0];
     let estado = $(element_estado).attr("estado-doc");
 
     $("#doc-id").val(id);
 
     $("#nombre-doc1").val(element_nombre_doc);

 
     if (estado==1) {
         document.getElementById("estado-doc1").checked = true;
         template = "Activo";
         $("#estado1").html(template);
     }
     
     if (estado==2) {
         document.getElementById("estado-doc1").checked = false;
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
 
 
 
 