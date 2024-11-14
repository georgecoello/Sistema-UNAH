
ID_STUDENT = document.getElementById('id-user-session').getAttribute('id-student'); //ID ESTUDIANTE LOGUEADO
ESTADO_PERIODO = document.getElementById('estado-periodo').getAttribute('estado-periodo');

 /**FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
 $(document).ready(function () {
 
    ObtenerCita();
    $('#estado-exp').removeClass("disabled");
    $('#cita-estudiante').removeClass("disabled");

    if( ESTADO_PERIODO == "2"){
        $("#crear-exp").remove();
        $("#estado-exp").remove();
    }

});

function ObtenerCita(){

    let id = ID_STUDENT;

    $.get("../../controller/estudiante/obtener-cita.php", {id}, function (e) {
        let cita = JSON.parse(e);
        
        if (cita=="Fallo") {
            toastr["warning"]("UPS! Ha ocurrido un problema, intente actualizar la pagina");
        } else {

            let fecha_cita = cita.cita;
            document.getElementById("fecha-cita").innerHTML = fecha_cita; 

        }


    });
    
}


