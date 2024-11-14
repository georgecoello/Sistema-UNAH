/**
 * CODIGOS DE DOCUMENTOS
 * 1: Constancia de Verificación de Nombre 
 * 2: Fotocopia de DNI
 * 3: Certificación de Calificaciones
 * 4: Constancia de Trabajo Social Comunitario, emitida por VOAE
 * 5: Constancia de Práctica Profesional Laboral 
 * 6: Solicitud de realización del Examen del Himno y su aprobación 
 * 7: Solicitud de Extensión de Título
 * 8: Fotocopia de Título de Educación Media 
 * 9: Boleta por Pago de Carnet 
 * 10: Boleta de Pago de Trámites de Graduación
 * 11: Boleta de Pago de Entrega de Título por Ventanilla
 * 12: Solvencia de Registro 
 * 13: Foto Ovalada 
 * 14: Timbre de contratación
 * 15: Constancia de Conducta y Mención Honorfica firmada por el Coordinador 
 * 16: Justificación de Mención Honorífica
 * 17: Solicitud de Honores Académicos 
 */


ID_STUDENT = document.getElementById('id-user-session').getAttribute('id-student'); // ID ESTUDIANTE LOGUEADO

/** FUNCION PARA REALIZAR FUNCIONES NECESARIAS EN CUANTO CARGUE LA PAGINA */
$(document).ready(function () {
    inicializar();
});

/** FUNCION PARA INICIALIZAR LOS VALORES DE LA VISTA */
async function inicializar() {
    let id = await obtenerDatosEstudiante();
    subidos(id);

    /** HABILITAMOS LOS BOTONES SEGUN EL ESTADO DE SOLICITUD */
    $.get("../../controller/estudiante/obtener-estado-soli.php", { id }, function (e) {
        let estado = JSON.parse(e);

        if (estado.estado == "2" || estado.estado == "3" || estado.estado == "4") {
            $('#estado-exp').removeClass("disabled");
        } else if (estado.estado == "1") {
            $('#estado-exp').removeClass("disabled");
            $('#cita-estudiante').removeClass("disabled");
            $('#descarga').removeClass("disabled");
        }
    });
}

/** OBTIENE LOS VALORES DEL ESTUDIANTE Y ALMACENA EN INPUTS HIDDEN */
async function obtenerDatosEstudiante() {
    let id_user = ID_STUDENT;

    const resultado = await $.get("../../controller/estudiante/obtener-estudiante.php", { id_user });
    let estudiante = JSON.parse(resultado);

    if (estudiante.estado_info !== "1") {
        location.hrref = "../../controller/estudiante/estado-informacion.php";
    } else {
        // ALMACENAMOS ESTOS VALORES EN INPUTS HIDDEN PARA ACCEDER A ELLOS MAS TARDE
        $("#id-estudiante").val(estudiante.id);
        $("#cuenta-estudiante").val(estudiante.cuenta);
        $("#carrera-estudiante").val(estudiante.carrera);

        // MOSTRAR CAMPOS PARA DOCUMENTOS DE EXCELENCIA SI APLICA
        if (estudiante.excelencia == "2") {
            $('.docs-excelencia').remove();
        }

        const docs_otros = await $.get("../../controller/estudiante/obtener-otros-docs.php", { carrera: estudiante.carrera });
        let docs = JSON.parse(docs_otros);

        let template = "";
        docs.forEach(doc => {
            template += `<li>${doc.nombre}</li>`;
        });
        $("#lista-otros").html(template);

        return estudiante.id;
    }
}

/** CAMBIA EL COLOR Y VALOR DEL BADGE SI YA SE SUBIÓ O NO EL DOCUMENTO */
function subidos(id_student) {
    $.get("../../controller/estudiante/documentos-subidos.php", { id_student }, function (e) {
        let documentos = JSON.parse(e);

        if (documentos == 'problema') {
            toastr["warning"]("Ups! Ha ocurrido un error");
        } else {
            if (documentos.length !== 0) {
                let template = "Subido";

                documentos.forEach(documento => {
                    let elementoClase = "#sub-doc-" + documento.codigo;
                    $(elementoClase).removeClass('badge-danger');
                    $(elementoClase).addClass('badge-success');
                    $(elementoClase).html(template);
                });
            }
        }

        validarTodos(id_student);
    });
}

/** ESCUCHA EL BOTON PARA SUBIR EL DOCUMENTO DE LA TABLA */
$(document).on("click", ".subir", function () {
    $(this)[0].disabled = true;
    let element_codigo = $(this)[0].parentElement.parentElement;
    let codigo = $(element_codigo).attr("codigo");
    let element_archivo = $(this)[0].parentElement.parentElement.getElementsByClassName("doc-estudiante")[0].getElementsByClassName("doc")[0];
    let archivo = $(element_archivo).prop('files')[0];

    if (!archivo) {
        $(this)[0].disabled = false;
        toastr["error"]("El campo del archivo está vacío, debe subir el documento correspondiente.");
    } else {
        let x = 0;
        let errormsg = "";
        let pesoArchivo = archivo.size;
        let nombreArchivo = archivo.name;
        let extensionValida = /(.pdf)$/i;

        if (!extensionValida.exec(nombreArchivo)) {
            x++;
            errormsg += "La extensión del archivo debe ser '.pdf'";
        }

        if (pesoArchivo > 5000000) {
            x++;
            errormsg += "El archivo excede los 5MB";
        }

        if (x > 0) {
            toastr["warning"](errormsg);
            $(this)[0].disabled = false;
        } else {
            let id_estudiante = $("#id-estudiante").val();
            let cuenta_student = $("#cuenta-estudiante").val();

            $.get("../../controller/estudiante/obtener-linksolicitud.php", { id_estudiante }, function (e) {
                let link = JSON.parse(e);

                if (!link || link.error || link == "Fallo") {
                    toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo");
                    $(this)[0].disabled = false;
                } else {
                    toastr["success"]("Espere, se está subiendo su archivo");
                    let extension = nombreArchivo.slice((nombreArchivo.lastIndexOf(".") - 1 >>> 0) + 2);
                    let ruta = link.link;
                    let id_solicitud = link.id;
                    var formData = new FormData();
                    formData.append('file', archivo);
                    formData.append('id', id_estudiante);
                    formData.append('cuenta', cuenta_student);
                    formData.append('ruta', ruta);
                    formData.append('codigo', codigo);
                    formData.append('extension', extension);
                    formData.append('id_solicitud', id_solicitud);

                    $.ajax({
                        data: formData,
                        url: "../../controller/estudiante/subir-documento.php",
                        type: "POST",
                        contentType: false,
                        processData: false,
                        success: function (e) {
                            if (e == "Error") {
                                toastr["error"]("Ups! Ha ocurrido un error, intentelo de nuevo");
                            } else {
                                toastr["success"]("Se ha subido el documento satisfactoriamente");
                                subidos(id_estudiante);
                            }
                        }
                    });
                }
            });
            $(element_archivo).val('');
            $(this)[0].disabled = false;
        }
    }
});

/** VALIDA SI YA ESTAN SUBIDOS TODOS LOS DOCUMENTOS PARA HABILITAR EL BOTON DE ENVIO */
function validarTodos(id_estudiante) {
    $.get("../../controller/estudiante/obtener-linksolicitud.php", { id_estudiante }, function (e) {
        let link = JSON.parse(e);

        if (!link || link.error || link == "Fallo") {
            toastr["warning"]("UPS! Ha ocurrido un error, intentelo de nuevo");
        } else {
            if (link.estado == "5") {
                let filasTabla = $("#example tr").length - 1;
                var x = 0;

                for (var i = 1; i < filasTabla + 1; i++) {
                    let badget_id = "#sub-doc-" + i;
                    let validar_clase = $(badget_id).hasClass("badge-success");

                    if (validar_clase) {
                        x++;
                    }
                }

                if (x == filasTabla) {
                    toastr["success"]("Todos los documentos han sido subidos, se habilitó el botón de envío");
                    $('#enviar').removeAttr("disabled");
                }
            } else {
                $('#estado-exp').removeClass("disabled");
                $('.subir').attr('disabled', 'disabled');
            }
        }
    });
}

$(document).on("click", "#enviar", function () {
    let id_estudiante = $("#id-estudiante").val();
    let estado = 2;

    $.post("../../controller/estudiante/enviar-expediente.php", { id_estudiante, estado }, function (e) {
        let respuesta = JSON.parse(e);

        if (respuesta == 'Error') {
            toastr["warning"]("Ups! Ha ocurrido un error");
        } else {
            toastr["success"]("Se ha enviado su documentación");
            $('#enviar').attr('disabled', 'disabled');
            inicializar();
        }
    });
});
