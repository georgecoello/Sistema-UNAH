/**
 * 
 * ESTADO DOCUMENTO ESTUDIANTE 
 * 1:NO
 * 2:SI
 * 
 */


ID_STUDENT = document.getElementById('id-user-session').getAttribute('id-student'); //ID ESTUDIANTE LOGUEADO
ESTADO_PERIODO = document.getElementById('estado-periodo').getAttribute('estado-periodo');

 /**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
 $(document).ready(function () {
 
    validarInfo();

});

function validarInfo(){

    let id_user = ID_STUDENT;

    $.get("../../controller/estudiante/obtener-estadodoc.php", {id_user}, function (e) {
        let estudiante = JSON.parse(e);

        var id = estudiante.id;

        /**HABILITAMOS LOS BOTONS SEGUN EL ESTADO DE SOLICITUD */
        $.get("../../controller/estudiante/obtener-estado-soli.php", {id}, function (e) {
            let estado = JSON.parse(e);

            if ( estado.estado == "2" || estado.estado == "3" || estado.estado == "4") {

                $('#estado-exp').removeClass("disabled");

            } else if( estado.estado == "1" ){

                $('#estado-exp').removeClass("disabled");
                $('#cita-estudiante').removeClass("disabled");
                

            }

        });

        if( ESTADO_PERIODO == "2"){
            $("#crear-exp").remove();
            $("#estado-exp").remove();
        }

        /**SI ESTA SUBIDO EL DOCUMENTO, LO MUESTRA */

        if(estudiante.estado == "2"){

            $('#link-habilitar').removeAttr('hidden');
            
            var id = estudiante.id;

            document.getElementById("btn-descarga").href='../../controller/estudiante/descarga-constancia-estudiante.php?id='+id; 

        }

    });
}