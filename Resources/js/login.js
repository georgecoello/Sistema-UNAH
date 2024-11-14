/**
 * 
 * ESTADOS DE USUARIO
 * 1 = Activo
 * 2 = Inactivo
 * 
 * 
 * ROLES DE USUARIOS
 * 1 = Coordinador de IC
 * 2 = Coordinador de II
 * 3 = Coordinador de IS
 * 4 = Coordinador de IE
 * 5 = Coordinador de IM
 * 6 = Coordiandor de IQ
 * 7 = ESTUDIANTES
 * 8 = ADMIN DE USUARIOS
 * 
 * MODULOS
 * 1 = Admin
 * 2 = Coordinador
 * 3 = Estudiante 
 *
 * 
 */

CONTADOR_LOGS = 0;

$("#login-form").submit(function (e) { 
    console.log(CONTADOR_LOGS);
    $('#entrar').disabled=true;
    e.preventDefault();

    var x = 0;
    var errormsg = "";
    
    const postData = {
        correo: $("#correo").val(),
        pass: $("#password").val(),
    };  

    /**VALIDACION DE LOS CAMPOS*/

    if( postData.correo == null || postData.correo.length == 0 || /^\s+$/.test(postData.correo) ) {
        document.getElementById("correo").className = "form-control is-invalid";
        errormsg += "Ingrese su correo electronico.  <br>";
        x = x+1;
    } else{
        document.getElementById("correo").className = "form-control";
    }

    if( postData.pass == null || postData.pass.length == 0 || /^\s+$/.test(postData.pass) ) {
        document.getElementById("password").className = "form-control is-invalid";
        errormsg += "Ingrese su contaseña. <br>";
        x = x+1;
    } else{
        document.getElementById("password").className = "form-control";
    }

    /**VALIDA QUE LOS CAMPOS DE CORREO Y CONTRASENNA ESTEN LLENOS */

    if (x > 0){
        toastr["warning"](errormsg);
        $('#entrar').disabled=false;
        
    } else {

        /**VALIDA QUE HAYA UNA CUENTA CON EL CORREO INTRODUCIDO*/
        $.post("controller/usuarios/validar-correo.php", postData, function (e){
            if (e){
                toastr["warning"]("No existe ninguna cuenta con este correo");
                $('#entrar').disabled=false;
            } else {

                /**VALIDA EL CORREO Y CONTRASENNA INTRODUCIDOS COINCIDAN */
                $.post("controller/login/info-user.php", postData, function (e){
                    
                    let user = JSON.parse(e);

                    if(user == "No coinciden"){

                        toastr["warning"]("La contraseña y correo electrónico no coinciden");
                        $('#entrar').disabled=false;
                    
                    } else {
                        
                        /**VALIDA QUE EL USUARIO ESTE ACTIVO Y NO DESACTIVADO*/
                        if(user.estado == "2"){
                            toastr["warning"]("Este usuario se encuentra actualmente en estado Desactivado");
                            $('#entrar').disabled=false;
                        } else {

                            toastr["success"]("En un momento se le redirigirá a su pagina de inicio.");

                            $.post("controller/login/inicio-sesion.php", user, function (e) {
                                
                                
                    
                                if( e == "1"){

                                    window.location="../../module/admin/gestion-usuarios.php";
                                    
                                    
                                }
                                if( e == "2"){

                                    window.location="../../module/coordinador/validar-info-estudiante.php";
                                    
                                    
                                }
                                if( e == "3"){

                                    window.location="../../module/estudiante/estado-informacion.php";
                                    
                                    
                                }
                                
                            
                            });

                            

                        }

                    }

                });
            }
        })
    }
    
    

    

});