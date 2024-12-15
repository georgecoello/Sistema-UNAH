-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 23-06-2021 a las 20:57:30
-- Versión del servidor: 8.0.25-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `expedientes-graduacion`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_AGREGAROTRODOC` (IN `nombre` VARCHAR(200), IN `carrera` INT, IN `estado_doc` TINYINT)  BEGIN

	INSERT INTO `expedientes-graduacion`.`otros_documentos`
	(`nombre_documento`,
	`id_carrera`,
	`estado`)
	VALUES
	(nombre,
	carrera,
	estado_doc);


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_APROBARINFOESTUDIANTE` (IN `id_student` INT)  BEGIN

	UPDATE estudiante
	SET estado_informacion = 1
	WHERE id_estudiante = id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCARCITAS` (IN `rol_coor` INT, IN `buscador` VARCHAR(45))  BEGIN

	SELECT est.id_estudiante, u_est.nombres_usuario, u_est.apellidos_usuario, est.numero_cuenta_estudiante, cita.fecha_cita   
	FROM (((cita INNER JOIN estudiante AS est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario AS u_est ON est.id_usuario = u_est.id_usuario) INNER JOIN usuario AS coord ON coord.id_usuario = cita.id_usuario)
	WHERE coord.id_rol = rol_coor AND (u_est.nombres_usuario LIKE buscador OR u_est.apellidos_usuario LIKE buscador OR est.numero_cuenta_estudiante LIKE buscador OR cita.fecha_cita LIKE buscador)
    ORDER BY cita.id_cita DESC;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCARESTUDIANTESINDOC` (IN `id_rol` INT, IN `buscador` VARCHAR(45), IN `estado` TINYINT)  BEGIN
	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante FROM (estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)
	WHERE estudiante.estado_informacion=1 AND estudiante.id_carrera=id_rol AND estudiante.estado_documento_descarga=estado AND (usuario.nombres_usuario LIKE buscador OR usuario.apellidos_usuario LIKE buscador OR estudiante.numero_cuenta_estudiante LIKE buscador)
	ORDER BY estudiante.id_estudiante ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCARESTUDIANTESINVALIDAR` (IN `id_rol` INT, IN `buscador` VARCHAR(45), IN `estado_info` TINYINT)  BEGIN
	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante FROM (estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)
	WHERE estudiante.estado_informacion=estado_info AND estudiante.id_carrera=id_rol AND (usuario.nombres_usuario LIKE buscador OR usuario.apellidos_usuario LIKE buscador OR estudiante.numero_cuenta_estudiante LIKE buscador)
	ORDER BY estudiante.id_estudiante ASC;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BUSCAREXPEDIENTESINREVISAR` (IN `rol_coor` INT, IN `buscador` VARCHAR(45), IN `estado_solicitud` TINYINT)  BEGIN
	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante 
    FROM ((usuario INNER JOIN estudiante ON usuario.id_usuario = estudiante.id_usuario) INNER JOIN solicitud ON estudiante.id_estudiante = solicitud.id_estudiante)
	WHERE solicitud.estado = estado_solicitud AND estudiante.id_carrera = rol_coor AND (usuario.nombres_usuario LIKE buscador OR usuario.apellidos_usuario LIKE buscador OR estudiante.numero_cuenta_estudiante LIKE buscador);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CAMBAIRESTADODOCINVALIDO` (IN `id_soli` INT, IN `codigo_doc` INT)  BEGIN
	
    UPDATE `expedientes-graduacion`.`documento`
	SET
	`estado` = 2
	WHERE `id_solicitud` = id_soli AND `codigo_documento`= codigo_doc ;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CAMBIARPASSWORD` (IN `new_password` VARCHAR(300), IN `id_user` INT, IN `token_user` VARCHAR(45))  BEGIN
	UPDATE `expedientes-graduacion`.`usuario`
	SET
	`password_usuario` = new_password
	WHERE `id_usuario` = id_user;
    
    UPDATE `expedientes-graduacion`.`token`
	SET
	`estado_token` = 2
	WHERE `token` = token_user AND `Usuario_id_usuario`=id_user;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CAMBIARPASSWORD2` (IN `new_password` VARCHAR(300), IN `id_user` INT)  BEGIN

	UPDATE `expedientes-graduacion`.`usuario`
	SET
	`password_usuario` = new_password
	WHERE `id_usuario` = id_user;
    

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CREARSOLICITUDESTUDIANTE` (IN `link` VARCHAR(500), IN `id_student` INT)  BEGIN

	INSERT INTO `expedientes-graduacion`.`solicitud`
	(`estado`,
	`fecha_solicitud`,
	`id_estudiante`,
	`ruta_solicitud`)
	VALUES
	(5,
	now(),
	id_student,
	link);


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CREARTOKEN` (IN `token` VARCHAR(45), IN `id_user` INT)  BEGIN
	INSERT INTO `expedientes-graduacion`.`token`
	(`token`,
	`estado_token`,
	`Usuario_id_usuario`)
	VALUES
	(token,
	1,
	id_user);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITARCITA` (IN `new_fecha` DATETIME, IN `id_student` INT)  BEGIN

	UPDATE `expedientes-graduacion`.`cita`
	SET
	`fecha_cita` = new_fecha
	WHERE `id_estudiante` = id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITAROTRODOC` (IN `id` INT, IN `nombre` VARCHAR(200), IN `carrera` INT, IN `estado_doc` TINYINT)  BEGIN
	UPDATE `expedientes-graduacion`.`otros_documentos`
	SET
	`nombre_documento` = nombre,
	`id_carrera` = carrera,
	`estado` = estado_doc
	WHERE `id_otros_documentos` = id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITARUSUARIO` (IN `id_edit` INT, IN `nombres_edit` VARCHAR(45), IN `apellidos_edit` VARCHAR(45), IN `correo_edit` VARCHAR(45), IN `estado_edit` TINYINT, IN `id_rol_edit` INT)  BEGIN
	UPDATE `expedientes-graduacion`.`usuario` 
    SET 
    `nombres_usuario`= nombres_edit,
    `apellidos_usuario`= apellidos_edit ,
    `correo_usuario`= correo_edit,
    `estado_usuario`= estado_edit,
    `id_rol`= id_rol_edit
    WHERE `id_usuario`=id_edit;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_EDITPERIODOENTREGA` (IN `inicio` DATETIME, IN `fin` DATETIME, IN `estado_periodo` TINYINT, IN `id` INT)  BEGIN

	UPDATE `expedientes-graduacion`.`periodo_entregas`
	SET
	`fecha_inicio` = inicio,
	`fecha_fin` = fin,
	`estado` = estado_periodo
	WHERE `id_periodo_entregas` = id;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ENVIAREXPEDIENTE` (IN `id_student` INT, IN `estado_exp` TINYINT)  BEGIN
	UPDATE `expedientes-graduacion`.`solicitud`
	SET
	`estado` = estado_exp
	WHERE `id_estudiante` = id_student;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ESTADOSOLICITUDESTUDIANTE` (IN `id_user_student` INT)  BEGIN
	SELECT solicitud.estado FROM (solicitud INNER JOIN estudiante ON solicitud.id_estudiante = estudiante.id_estudiante) INNER JOIN usuario ON usuario.id_usuario = estudiante.id_usuario
	WHERE usuario.id_usuario = id_user_student;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETCOMENTARIOINFO` (IN `id_student` INT)  BEGIN
	
    SELECT * FROM comentario_informacion
	WHERE id_estudiante = id_student 
	ORDER BY id_comentario_informacion DESC
	LIMIT 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETDATOSESTUDIANTE` (IN `id_student` INT)  BEGIN

	SELECT usuario.id_usuario ,estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.identidad_estudiante, usuario.correo_usuario, estudiante.numero_cuenta_estudiante, estudiante.id_carrera, estudiante.estado_excelencia, estudiante.estado_informacion, estudiante.hash_correo
	FROM (estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)
    WHERE usuario.id_usuario = id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETDOCUMENTOSINVALIDOS` (IN `id_student` INT)  BEGIN

	SELECT documento.codigo_documento, documento.estado, respuesta_documento.descripcion
	FROM ((solicitud INNER JOIN documento ON documento.id_solicitud = solicitud.id_solicitud) INNER JOIN respuesta_documento ON documento.id_documento = respuesta_documento.id_documento)
	WHERE solicitud.id_estudiante = id_student
    ORDER BY respuesta_documento.id_respuesta_documento ASC;
		
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETDOCUMENTOSSUBIDOS` (IN `id_student` INT)  BEGIN
	
    SELECT documento.id_documento, documento.link_documento, documento.codigo_documento FROM (documento INNER JOIN solicitud ON solicitud.id_solicitud = documento.id_solicitud)
	WHERE solicitud.id_estudiante = id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETESTADODOCESTUDIANTE` (IN `id_student` INT)  BEGIN
	SELECT estudiante.id_estudiante, estudiante.estado_documento_descarga
	FROM (estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)
    WHERE usuario.id_usuario = id_student;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETESTADOSOLICITUD` (IN `id_student` INT)  BEGIN
	SELECT estado, ruta_solicitud FROM solicitud
	WHERE id_estudiante = id_student;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETESTUDIANTESSINVALIDARPAG` (IN `numero_registros` INT, IN `offset_registros` INT, IN `id_rol` INT, IN `estado_info` TINYINT)  BEGIN
	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante FROM (estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)
	WHERE estudiante.estado_informacion=estado_info AND estudiante.id_carrera=id_rol 
	ORDER BY estudiante.id_estudiante ASC
	LIMIT numero_registros OFFSET offset_registros;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETEXPEDIENTESINVALIDARPAG` (IN `numero_registros` INT, IN `offset_registros` INT, IN `rol_coor` INT, IN `estado_solicitud` TINYINT)  BEGIN

	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante, estudiante.estado_excelencia, solicitud.id_solicitud, solicitud.estado, usuario.correo_usuario
    FROM ((usuario INNER JOIN estudiante ON usuario.id_usuario = estudiante.id_usuario) INNER JOIN solicitud ON estudiante.id_estudiante = solicitud.id_estudiante)
	WHERE solicitud.estado = estado_solicitud AND estudiante.id_carrera = rol_coor
    ORDER BY estudiante.id_estudiante ASC
	LIMIT numero_registros OFFSET offset_registros;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLINKDESCARGAESTUDIANTE` (IN `id_student` INT)  BEGIN

	SELECT link_documento FROM descargas_estudiante
	WHERE id_estudiante=id_student;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLINKDOC` (IN `doc_id` INT)  BEGIN

	SELECT link_documento FROM documento
	WHERE id_documento=doc_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLINKDOCESTUDIANTE` (IN `id_student` INT)  BEGIN
	SELECT * FROM documento_estudiante

    WHERE id_estudiante=id_student;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLINKSDOCUMENTOSESTUDIANTE` (IN `id_estudiante` INT)  BEGIN
	SELECT documento.id_documento ,documento.link_documento, documento.codigo_documento, documento.estado, solicitud.estado AS estado_solicitud
	FROM ((documento INNER JOIN solicitud ON documento.id_solicitud = solicitud.id_solicitud) INNER JOIN estudiante ON solicitud.id_estudiante = estudiante.id_estudiante)
	WHERE solicitud.id_estudiante = id_estudiante
	ORDER BY documento.codigo_documento ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTAUSUARIO` ()  BEGIN
	SELECT usuario.id_usuario, usuario.nombres_usuario, usuario.apellidos_usuario, usuario.correo_usuario, rol.nombre_rol, usuario.estado_usuario FROM 
		(usuario INNER JOIN rol ON usuario.id_rol = rol.id_rol AND usuario.id_rol != 7);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTCARRERAS` ()  BEGIN
	SELECT * FROM  carrera;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTCITAS` (IN `numero_registros` INT, IN `offset_registros` INT, IN `rol_coor` INT)  BEGIN

	SELECT est.id_estudiante, u_est.nombres_usuario, u_est.apellidos_usuario, est.numero_cuenta_estudiante, cita.fecha_cita   
	FROM (((cita INNER JOIN estudiante AS est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario AS u_est ON est.id_usuario = u_est.id_usuario) INNER JOIN usuario AS coord ON coord.id_usuario = cita.id_usuario)
	WHERE coord.id_rol = rol_coor
    ORDER BY cita.id_cita DESC
	LIMIT numero_registros OFFSET offset_registros;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTCITASEXCEL` (IN `rol_coor` INT, IN `fecha_buscar` VARCHAR(45))  BEGIN

	SELECT u_est.nombres_usuario, u_est.apellidos_usuario, est.numero_cuenta_estudiante, cita.fecha_cita   
	FROM (((cita INNER JOIN estudiante AS est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario AS u_est ON est.id_usuario = u_est.id_usuario) INNER JOIN usuario AS coord ON coord.id_usuario = cita.id_usuario)
	WHERE coord.id_rol = rol_coor AND cita.fecha_cita LIKE fecha_buscar
    ORDER BY cita.fecha_cita ASC;
    

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTESTUDIANTESINDOCUMENTO` (IN `numero_registros` INT, IN `offset_registros` INT, IN `id_rol` INT, IN `estado` TINYINT)  BEGIN

	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante FROM (estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)
	WHERE estudiante.estado_informacion=1 AND estudiante.id_carrera=id_rol AND estudiante.estado_documento_descarga=estado
	ORDER BY estudiante.id_estudiante ASC
	LIMIT numero_registros OFFSET offset_registros;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTFECHAENTREGAS` ()  BEGIN

	SELECT * FROM periodo_entregas
	ORDER BY id_periodo_entregas DESC;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTOTROSDOCUMENTOS` (IN `carrera` INT)  BEGIN

	SELECT * FROM otros_documentos
	WHERE id_Carrera = carrera;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETLISTROL` ()  BEGIN
	SELECT * FROM  rol WHERE rol.id_rol != 7;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GETMISDATOS` (IN `id_user` INT)  BEGIN

	SELECT * FROM (usuario INNER JOIN rol ON usuario.id_rol=rol.id_rol) 
	WHERE id_usuario =id_user;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GUARDARDOCUMENTO` (IN `link` VARCHAR(500), IN `solicitud` INT, IN `codigo` INT)  BEGIN

	SELECT * FROM `expedientes-graduacion`.documento;INSERT INTO `expedientes-graduacion`.`documento`
	(`link_documento`,
	`id_solicitud`,
	`estado`,
	`codigo_documento`)
	VALUES
	(link,
	solicitud,
	2,
	codigo);


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GUARDARESTUDIANTE` (IN `nombres_new` VARCHAR(45), IN `apellidos_new` VARCHAR(45), IN `correo_new` VARCHAR(45), IN `contraseña` VARCHAR(300), IN `cuenta_new` VARCHAR(45), IN `identidad_new` VARCHAR(45), IN `excelencia_new` TINYINT, IN `carrera_new` INT, IN `hash_new` VARCHAR(45))  BEGIN

	INSERT INTO `expedientes-graduacion`.`usuario`
		(`nombres_usuario`,
		`apellidos_usuario`,
		`correo_usuario`,
		`password_usuario`,
		`fecha_creacion`,
		`estado_usuario`,
		`id_rol`)
		VALUES
		(nombres_new,
		apellidos_new,
		correo_new,
		contraseña,
		now(),
		1,
		7);
        
	INSERT INTO `expedientes-graduacion`.`estudiante`
		(`id_usuario`,
		`numero_cuenta_estudiante`,
		`estado_excelencia`,
		`estado_informacion`,
		`id_carrera`,
        `identidad_estudiante`,
        `hash_correo`,
        `estado_correo`,
        `estado_documento_descarga`)
		VALUES
		(LAST_INSERT_ID(),
		cuenta_new,
		excelencia_new,
		5,
		carrera_new,
        identidad_new,
        hash_new,
        2,
        1);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GUARDARLINKDESCARGAESTUDIANTE` (IN `link` VARCHAR(500), IN `id_student` INT)  BEGIN

	INSERT INTO `expedientes-graduacion`.`descargas_estudiante`
	(`link_documento`,
	`id_estudiante`)
	VALUES
	(link,
	id_student);
    
    UPDATE `expedientes-graduacion`.`estudiante`
	SET
	`estado_documento_descarga` = 2
	WHERE `id_estudiante` = id_student;
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GUARDARLINKDOCESTUDIANTE` (IN `link` VARCHAR(500), IN `id_student` INT)  BEGIN

	INSERT INTO `expedientes-graduacion`.`documento_estudiante`
	(`link_documento`,
	`id_estudiante`)
	VALUES
	(link,
	id_student);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GUARDARPERIODOENTREGA` (IN `inicio` DATETIME, IN `fin` DATETIME, IN `estado_periodo` TINYINT)  BEGIN

	INSERT INTO `expedientes-graduacion`.`periodo_entregas`
	(`fecha_inicio`,
	`fecha_fin`,
	`estado`)
	VALUES
	(inicio,
	fin,
	estado_periodo);


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_GUARDARUSUARIO` (IN `nombres_new` VARCHAR(45), IN `apellidos_new` VARCHAR(45), IN `correo_new` VARCHAR(45), IN `contraseña` VARCHAR(300), IN `estado_new` TINYINT, IN `id_rol_new` INT)  BEGIN
	
	INSERT INTO `expedientes-graduacion`.`usuario`
		(`nombres_usuario`,
		`apellidos_usuario`,
		`correo_usuario`,
		`password_usuario`,
		`fecha_creacion`,
		`estado_usuario`,
		`id_rol`)
		VALUES
		(nombres_new,
		apellidos_new,
		correo_new,
		contraseña,
		now(),
		estado_new,
		id_rol_new);

    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_HORASDEFECHA` (IN `rol_coor` INT, IN `buscador` VARCHAR(45))  BEGIN

	SELECT cita.fecha_cita   
	FROM (((cita INNER JOIN estudiante AS est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario AS u_est ON est.id_usuario = u_est.id_usuario) INNER JOIN usuario AS coord ON coord.id_usuario = cita.id_usuario)
	WHERE coord.id_rol = rol_coor AND cita.fecha_cita LIKE buscador
    ORDER BY cita.fecha_cita ASC;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INGRESARHASH` (IN `id_student` INT)  BEGIN
	
    UPDATE `expedientes-graduacion`.`estudiante`
	SET
	`estado_informacion` = 2

	WHERE `id_usuario` = id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INVALIDARDOCUMENTO` (IN `id_document` INT, IN `id_user` INT, IN `descripcion_doc` VARCHAR(500))  BEGIN
	UPDATE `expedientes-graduacion`.`documento`
	SET
	`estado` = 3
	WHERE `id_documento` = id_document;
    
    INSERT INTO `expedientes-graduacion`.`respuesta_documento`
	(`id_usuario`,
	`id_documento`,
	`descripcion`)
	VALUES
	(id_user,
	id_document,
	descripcion_doc);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INVALIDARSOLICITUD` (IN `id_soli` INT)  BEGIN
	UPDATE `expedientes-graduacion`.`solicitud`
	SET
	`estado` = 3
	WHERE `id_solicitud` = id_soli;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_NUMEROCITAS` (IN `rol_coor` INT)  BEGIN

	SELECT count(*) as citas
	FROM (((cita INNER JOIN estudiante AS est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario AS u_est ON est.id_usuario = u_est.id_usuario) INNER JOIN usuario AS coord ON coord.id_usuario = cita.id_usuario)
	WHERE coord.id_rol = rol_coor;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_NUMEROESTUDIANTESINDOC` (IN `rol_coor` INT, IN `estado` TINYINT)  BEGIN
	SELECT COUNT(*) as estudiantes FROM estudiante 
	WHERE estudiante.estado_informacion=1 AND id_carrera=rol_coor AND estado_documento_descarga=estado;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_NUMEROESTUDIANTESSINREVISAR` (IN `rol_coor` INT, IN `estado_info` TINYINT)  BEGIN
	SELECT COUNT(*) as estudiantes FROM `expedientes-graduacion`.estudiante WHERE estado_informacion = estado_info AND id_carrera=rol_coor;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_NUMEROEXPEDIENTESSINREVISAR` (IN `estado_solicitud` TINYINT, IN `coor_rol` INT)  BEGIN
	SELECT count(*) as estudiantes FROM (estudiante INNER JOIN solicitud ON estudiante.id_estudiante = solicitud.id_estudiante)
	WHERE solicitud.estado = estado_solicitud AND estudiante.id_carrera = coor_rol;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_OBTENERDESCRIPCIONDOCINVALIDO` (IN `id_soli` INT)  BEGIN
	SELECT respuesta_documento.id_documento, respuesta_documento.descripcion, documento.codigo_documento, documento.estado 
	FROM ((solicitud INNER JOIN documento ON solicitud.id_solicitud = documento.id_solicitud) INNER JOIN respuesta_documento ON documento.id_documento = respuesta_documento.id_documento) 
	WHERE solicitud.id_solicitud = id_soli;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_OBTENERDOCSOTROS` (IN `carrera` INT)  BEGIN
	SELECT * FROM otros_documentos
	WHERE id_carrera = carrera AND estado = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_OBTENERFECHACITA` (IN `id_user_student` INT)  BEGIN

	SELECT cita.fecha_cita FROM (cita INNER JOIN estudiante as est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario as us_est ON est.id_usuario = us_est.id_usuario
	WHERE us_est.id_usuario = id_user_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_OBTENERPERIODOENTREGA` ()  BEGIN
	SELECT * FROM `expedientes-graduacion`.periodo_entregas
	WHERE estado = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_OBTENERRUTASOLICITUD` (IN `id_student` INT)  BEGIN

	SELECT ruta_solicitud, id_solicitud, estado  FROM solicitud
	WHERE id_estudiante=id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_OBTENERTOKEN` (IN `token_new` VARCHAR(45), IN `id` INT)  BEGIN

	SELECT * FROM token WHERE Usuario_id_usuario = id AND token = token_new;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_PASSWORD` (IN `id` INT)  BEGIN
	SELECT password_usuario FROM `expedientes-graduacion`.usuario WHERE usuario.id_usuario=id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RECTIFICARINFOESTUDIANTE` (IN `id_student` INT, IN `comentario1` LONGTEXT)  BEGIN

	UPDATE estudiante
	SET estado_informacion = 3
	WHERE id_estudiante = id_student;
    
    INSERT INTO comentario_informacion
	(`comentario`,
	`id_estudiante`)
	VALUES
	(comentario1,
	id_student);
    

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_TRAERESTUDIANTESINVALIDAR` (IN `id_student` INT)  BEGIN

	SELECT estudiante.id_estudiante, usuario.nombres_usuario, usuario.apellidos_usuario, estudiante.numero_cuenta_estudiante, estudiante.identidad_estudiante, usuario.correo_usuario, carrera.nombre_carrera, estudiante.estado_excelencia 
    FROM ((estudiante INNER JOIN usuario ON estudiante.id_usuario = usuario.id_usuario)INNER JOIN carrera ON estudiante.id_carrera = carrera.id_carrera)
	WHERE estudiante.id_estudiante=id_student;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_TRAERUSUARIO` (IN `id_user` INT)  BEGIN
	SELECT id_usuario, nombres_usuario, apellidos_usuario, correo_usuario, estado_usuario, id_rol FROM `expedientes-graduacion`.usuario
	WHERE id_usuario =id_user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UPDATEINFOESTUDIANTE` (IN `id_user` INT, IN `name_user` VARCHAR(45), IN `apellido_user` VARCHAR(45), IN `correo_user` VARCHAR(45), IN `cuenta_student` VARCHAR(45), IN `estado_exc` TINYINT, IN `id_carrera` INT, IN `id_student` VARCHAR(45))  BEGIN

	UPDATE `expedientes-graduacion`.`usuario`
	SET
	`nombres_usuario` = name_user,
	`apellidos_usuario` = apellido_user,
	`correo_usuario` = correo_user
	WHERE `id_usuario` = id_user;
    
    
    UPDATE `expedientes-graduacion`.`estudiante`
	SET
	`numero_cuenta_estudiante` = cuenta_student,
	`estado_excelencia` = estado_exc,
	`estado_informacion` = 4,
	`id_carrera` = id_carrera,
	`identidad_estudiante` = id_student
	WHERE `id_usuario` = id_user;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VALIDARCITA` (IN `rol_coor` INT, IN `fecha_v` DATETIME)  BEGIN

	SELECT COUNT(*) as numero 
    FROM (((cita INNER JOIN estudiante AS est ON cita.id_estudiante = est.id_estudiante) INNER JOIN usuario AS u_est ON est.id_usuario = u_est.id_usuario) INNER JOIN usuario AS coord ON coord.id_usuario = cita.id_usuario)
	WHERE coord.id_rol = rol_coor AND fecha_cita = fecha_v;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VALIDARCORREO` (IN `correo_new` VARCHAR(45))  BEGIN
	SELECT usuario.id_usuario, usuario.nombres_usuario, usuario.apellidos_usuario, usuario.correo_usuario, usuario.password_usuario, usuario.estado_usuario, usuario.id_rol, rol.nombre_rol, modulo.id_modulo FROM usuario 
	INNER JOIN rol ON usuario.id_rol=rol.id_rol
	INNER JOIN rolxpermiso ON rol.id_rol = rolxpermiso.id_rol
	INNER JOIN modulo ON rolxpermiso.id_modulo = modulo.id_modulo
    WHERE usuario.correo_usuario = correo_new; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VALIDARDOCUMENTO` (IN `id_document` INT)  BEGIN

	UPDATE `expedientes-graduacion`.`documento`
	SET
	`estado` = 1
	WHERE `id_documento` = id_document;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VALIDARSOLICITUD` (IN `id_soli` INT, IN `id_student` INT, IN `id_coordinador` INT, IN `fecha` DATETIME)  BEGIN
	UPDATE `expedientes-graduacion`.`solicitud`
	SET
	`estado` = 1
	WHERE `id_solicitud` = id_soli;
    
    INSERT INTO `expedientes-graduacion`.`cita`
	(`fecha_creacion`,
	`fecha_cita`,
	`id_usuario`,
	`id_estudiante`)
	VALUES
	(now(),
	fecha,
	id_coordinador,
	id_student);


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `id_carrera` int NOT NULL,
  `nombre_carrera` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`id_carrera`, `nombre_carrera`) VALUES
(1, 'Ingenieria Civil'),
(2, 'Ingenieria Industrial'),
(3, 'Ingenieria en Sistemas'),
(4, 'Ingenieria Electrica Industrial'),
(5, 'Ingenieria Mecanica Industrial'),
(6, 'Ingenieria Quimica Industrial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_cita` datetime NOT NULL,
  `id_usuario` int NOT NULL,
  `id_estudiante` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `fecha_creacion`, `fecha_cita`, `id_usuario`, `id_estudiante`) VALUES
(1, '2021-06-21 17:09:29', '2021-02-09 14:20:00', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_informacion`
--

CREATE TABLE `comentario_informacion` (
  `id_comentario_informacion` int NOT NULL,
  `comentario` longtext NOT NULL,
  `id_estudiante` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `comentario_informacion`
--

INSERT INTO `comentario_informacion` (`id_comentario_informacion`, `comentario`, `id_estudiante`) VALUES
(1, 'Su indice academico global es de 78%', 71);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descargas_estudiante`
--

CREATE TABLE `descargas_estudiante` (
  `id_descargas_estudiante` int NOT NULL,
  `link_documento` varchar(500) NOT NULL,
  `id_estudiante` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `id_documento` int NOT NULL,
  `link_documento` varchar(500) NOT NULL,
  `id_solicitud` int NOT NULL,
  `estado` tinyint NOT NULL,
  `codigo_documento` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `documento`
--

INSERT INTO `documento` (`id_documento`, `link_documento`, `id_solicitud`, `estado`, `codigo_documento`) VALUES
(1, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_verificacion_nombre.pdf', 1, 1, 1),
(2, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Copia_identidad.pdf', 1, 1, 2),
(3, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_horas_VOAE.pdf', 1, 1, 4),
(4, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_finalizacion_practica.pdf', 1, 1, 6),
(5, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_solvencia_biblioteca.pdf', 1, 1, 5),
(6, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_aprobacion_examen_himno.pdf', 1, 1, 7),
(7, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Titulo_secundaria.pdf', 1, 1, 10),
(8, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_UV.pdf', 1, 1, 9),
(9, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Extension_titulos_secretaria.pdf', 1, 1, 8),
(10, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Pago_carnet.pdf', 1, 1, 12),
(11, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Pago_derecho_graduacion.pdf', 1, 1, 11),
(12, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Pago_timbre.pdf', 1, 1, 13),
(13, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Fotos.pdf', 1, 1, 14),
(14, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Solvencia_registro.pdf', 1, 1, 15),
(15, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Constancia_conducta.pdf', 1, 1, 17),
(16, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Formulario_honores_academicos.pdf', 1, 1, 18),
(17, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/20151002518_Otros.pdf', 1, 1, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos_solicitud`
--

CREATE TABLE `documentos_solicitud` (
  `id_documentos_solicitud` int NOT NULL,
  `nombre_documento` varchar(45) NOT NULL,
  `formato_documento` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_estudiante`
--

CREATE TABLE `documento_estudiante` (
  `id_documento_estudiante` int NOT NULL,
  `link_documento` varchar(500) NOT NULL,
  `id_estudiante` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `documento_estudiante`
--

INSERT INTO `documento_estudiante` (`id_documento_estudiante`, `link_documento`, `id_estudiante`) VALUES
(1, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez/DocsCoordinador-20151002518.docx', 1),
(2, 'Ingenieria_Mecanica/14_RonaldAlexanderGirónSánchez/DocsCoordinador-20151001797.docx', 14),
(3, 'Ingenieria_Mecanica/46_CarlosAndrésRomeroLicona/DocsCoordinador-20141002655.docx', 46);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id_estudiante` int NOT NULL,
  `id_usuario` int NOT NULL,
  `numero_cuenta_estudiante` varchar(45) NOT NULL,
  `estado_excelencia` tinyint NOT NULL,
  `estado_informacion` tinyint NOT NULL,
  `id_carrera` int NOT NULL,
  `identidad_estudiante` varchar(45) NOT NULL,
  `hash_correo` varchar(45) NOT NULL,
  `estado_correo` tinyint NOT NULL,
  `estado_documento_descarga` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `id_usuario`, `numero_cuenta_estudiante`, `estado_excelencia`, `estado_informacion`, `id_carrera`, `identidad_estudiante`, `hash_correo`, `estado_correo`, `estado_documento_descarga`) VALUES
(1, 5, '20151002518', 1, 1, 4, '0801199865234', 'EpBh', 2, 1),
(2, 8, '20151004125', 1, 2, 1, '0801199800450', 'weBk', 2, 1),
(3, 9, '20141005759', 2, 2, 1, '1701199601291', 'V8UQ', 2, 1),
(4, 10, '20101002964', 2, 2, 1, '0801199222592', 'AWt4', 2, 1),
(5, 11, '20141001441', 1, 2, 1, '0101199703882', 'SVE2', 2, 1),
(6, 12, '20123000248', 2, 2, 4, '0202199500171', 'tBeU', 2, 1),
(7, 13, '20121006108', 2, 2, 1, '0801199400764', '93AZ', 2, 1),
(8, 14, '20131008850', 2, 2, 1, '0209199602129', 'C0K1', 2, 1),
(9, 15, '20151002559', 1, 2, 3, '0801199705934', 'fPaN', 2, 1),
(10, 16, '20151900203', 1, 5, 1, '0801199709331', 'AoDU', 2, 1),
(11, 17, '9913675', 2, 2, 1, '0801197912132', 'zHm7', 2, 1),
(12, 18, '20151000575', 1, 2, 1, '0801199803663', '6pac', 2, 1),
(13, 19, '20141003306', 2, 2, 1, '1503199800097', 'BYvV', 2, 1),
(14, 20, '20151001797', 1, 1, 5, '0301199600665', 'VJkA', 2, 1),
(15, 21, '20151001017', 1, 2, 1, '0801199618308', '9tS6', 2, 1),
(16, 22, '20131902222', 2, 2, 1, '0302199500047', 'Yoaf', 2, 1),
(17, 23, '20151000129', 1, 2, 4, '0704199800455', 'r5ry', 2, 1),
(18, 24, '20141001692', 2, 2, 3, '0801199509735', 'T3yY', 2, 1),
(19, 25, '20131005111', 2, 2, 1, '0703199602324', 'YG6B', 2, 1),
(20, 26, '20091900351', 2, 5, 3, '0301198900853', 'I7F2', 2, 1),
(21, 27, '20121002850', 2, 2, 1, '0801199419232', 'Zzjq', 2, 1),
(22, 28, '20151001676', 1, 2, 3, '0801199723092', 'dngu', 2, 1),
(23, 29, '20153000190', 1, 2, 3, '0209199901543', 'ns3T', 2, 1),
(24, 30, '20151002529', 1, 2, 3, '0719199800086', '0b5l', 2, 1),
(25, 31, '20131008132', 2, 2, 1, '1012199500120', '319L', 2, 1),
(26, 32, '20131007180', 1, 5, 3, '0801199503476', 'qq9F', 2, 1),
(27, 33, '20151004281', 1, 5, 3, '0313199800638', 'oANw', 2, 1),
(28, 34, '20131004771', 2, 2, 3, '0803199400601', 'V0aI', 2, 1),
(29, 36, '20151001109', 2, 2, 3, '0801199621767', 'dHjY', 2, 1),
(30, 37, '20131017287', 2, 2, 1, '1504199600008', 'V87N', 2, 1),
(31, 38, '20021000462', 2, 2, 1, '0801198108558', 'DOq1', 2, 1),
(32, 39, '20132002082', 2, 2, 4, '0705199600038', 'HX1O', 2, 1),
(33, 40, '20141002663', 2, 2, 1, '0701199600093', '4lrJ', 2, 1),
(34, 41, '20141031877', 2, 2, 1, '0801199810807', 'JMQe', 2, 1),
(35, 42, '20141000677', 2, 2, 4, '0703199603339', 'bLr9', 2, 1),
(36, 43, '20152100098', 2, 2, 4, '1413199700399', 'Z7do', 2, 1),
(37, 44, '20151005708', 1, 5, 4, '0801199805865', 'KiqZ', 2, 1),
(38, 45, '20081003963', 2, 5, 4, '0801198908813', '4nDI', 2, 1),
(39, 46, '20141010975', 1, 2, 3, '0703199602014', 'SSWF', 2, 1),
(40, 47, '20151003836', 1, 2, 3, '0801199707679', 'c89x', 2, 1),
(41, 48, '20121002798', 2, 2, 3, '0801199514041', 'nm2K', 2, 1),
(42, 49, '20101006126', 2, 2, 1, '1306199100260', '4zlj', 2, 1),
(43, 50, '20131014581', 2, 2, 1, '0318199601143', 'NKRp', 2, 1),
(44, 51, '20141002782', 2, 2, 1, '0801199518383', '5y8n', 2, 1),
(45, 52, '20141930065', 2, 2, 1, '0301199701085', 'dO5I', 2, 1),
(46, 53, '20141002655', 2, 1, 5, '0701199600094', '8Smy', 2, 1),
(47, 54, '20051007265', 2, 2, 1, '0801198716163', 'enlI', 2, 1),
(48, 55, '20111011416', 2, 2, 1, '0801199320786', 'XPSo', 2, 1),
(49, 56, '20121001164', 2, 2, 1, '1622199400123', 'TfjD', 2, 1),
(50, 57, '20141000428', 1, 2, 3, '0801199618167', 'heow', 2, 1),
(51, 58, '20141003250', 1, 5, 1, '0801199515254', 'Ffno', 2, 1),
(52, 59, '20151005146', 1, 2, 1, '0801199711969', 'KPij', 2, 1),
(53, 60, '20091001573', 2, 2, 1, '0801199205875', '3uvg', 2, 1),
(54, 61, '20131000065', 2, 5, 4, '0801199613318', 'mPZc', 2, 1),
(55, 62, '20131009380', 1, 2, 2, '0601199403134', 'YOgG', 2, 1),
(56, 63, '20151002745', 2, 2, 4, '0801199616508', 'Spwm', 2, 1),
(57, 64, '20151001965', 1, 2, 4, '0801199607939', 'mmzK', 2, 1),
(58, 65, '20141001575', 2, 2, 1, '0801199611747', 'cZuC', 2, 1),
(59, 66, '20070007129', 2, 2, 1, '0801198918284', 'UApb', 2, 1),
(60, 67, '20141013123', 1, 2, 2, '1801199702621', 'EVSb', 2, 1),
(61, 68, '20141003589', 1, 2, 1, '0801199617156', 'blmc', 2, 1),
(62, 69, '20131014689', 2, 2, 1, '0801199418207', 'fPCG', 2, 1),
(63, 70, '20131000781', 2, 2, 1, '0801199418117', 'DzCv', 2, 1),
(64, 71, '20122502143', 1, 5, 6, '0704199300117', 'gCZ7', 2, 1),
(65, 72, '20131001645', 2, 5, 1, '0801199419410', 'Rdts', 2, 1),
(66, 73, '20151002720', 1, 2, 3, '1301199900599', '5gFt', 2, 1),
(67, 74, '20151002413', 1, 2, 1, '0801199703783', 'TSAM', 2, 1),
(68, 75, '20111003317', 2, 2, 4, '0801199222491', 'X9HF', 2, 1),
(69, 76, '20151001921', 2, 5, 1, '0826199800007', 'NoaH', 2, 1),
(70, 77, '20142030498', 2, 2, 2, '0107199800716', 'FQKg', 2, 1),
(71, 79, '20151005439', 1, 3, 5, '0303199800363', 'KMMg', 2, 1),
(72, 80, '20141005068', 2, 2, 1, '0801199620610', 'SLNk', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `id_modulo` int NOT NULL,
  `nombre_modulo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`id_modulo`, `nombre_modulo`) VALUES
(1, 'Administrador'),
(2, 'Coordinador'),
(3, 'Estudiante'),
(4, 'Super');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otros_documentos`
--

CREATE TABLE `otros_documentos` (
  `id_otros_documentos` int NOT NULL,
  `nombre_documento` varchar(200) NOT NULL,
  `id_carrera` int NOT NULL,
  `estado` tinyint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `otros_documentos`
--

INSERT INTO `otros_documentos` (`id_otros_documentos`, `nombre_documento`, `id_carrera`, `estado`) VALUES
(3, 'Informe de práctica', 4, 1),
(4, 'Constancia VOAE', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo_entregas`
--

CREATE TABLE `periodo_entregas` (
  `id_periodo_entregas` int NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `estado` tinyint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `periodo_entregas`
--

INSERT INTO `periodo_entregas` (`id_periodo_entregas`, `fecha_inicio`, `fecha_fin`, `estado`) VALUES
(8, '2021-06-22 08:00:00', '2021-06-25 20:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_permiso` int NOT NULL,
  `nombre_permiso` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`id_permiso`, `nombre_permiso`) VALUES
(1, 'Ingenieria Civil'),
(2, 'Ingenieria Industrial'),
(3, 'Ingenieria en Sistemas'),
(4, 'Ingenieria Electrica Industrial'),
(5, 'Ingenieria Mecanica Industrial'),
(6, 'Ingenieria Quimica Industrial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta_documento`
--

CREATE TABLE `respuesta_documento` (
  `id_respuesta_documento` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_documento` int NOT NULL,
  `descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int NOT NULL,
  `nombre_rol` varchar(45) NOT NULL,
  `fecha_creacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `fecha_creacion`) VALUES
(1, 'Coordinador Ingenieria Civil', '2021-06-20 23:53:14'),
(2, 'Coordinador Ingenieria Industrial', '2021-06-20 23:53:14'),
(3, 'Coordinador Ingenieria en Sistemas', '2021-06-20 23:53:14'),
(4, 'Coordinador Ingenieria Electrica Industrial', '2021-06-20 23:53:14'),
(5, 'Coordinador Ingenieria Mecanica Industrial', '2021-06-20 23:53:14'),
(6, 'Coordinador Ingenieria Quimica Industrial', '2021-06-20 23:53:14'),
(7, 'Estudiante', '2021-06-20 23:53:14'),
(8, 'Administrador', '2021-06-20 23:53:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolxpermiso`
--

CREATE TABLE `rolxpermiso` (
  `id_permiso` int DEFAULT NULL,
  `id_rol` int NOT NULL,
  `id_modulo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `rolxpermiso`
--

INSERT INTO `rolxpermiso` (`id_permiso`, `id_rol`, `id_modulo`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 2),
(4, 4, 2),
(5, 5, 2),
(6, 6, 2),
(NULL, 7, 3),
(NULL, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id_solicitud` int NOT NULL,
  `estado` tinyint NOT NULL,
  `fecha_solicitud` datetime NOT NULL,
  `id_estudiante` int NOT NULL,
  `ruta_solicitud` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id_solicitud`, `estado`, `fecha_solicitud`, `id_estudiante`, `ruta_solicitud`) VALUES
(1, 1, '2021-06-21 16:54:03', 1, 'Ingenieria_Electrica/1_ElenaMariaLopezMendez'),
(2, 5, '2021-06-23 20:36:53', 14, 'Ingenieria_Mecanica/14_RonaldAlexanderGirónSánchez'),
(3, 5, '2021-06-23 20:42:22', 46, 'Ingenieria_Mecanica/46_CarlosAndrésRomeroLicona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token`
--

CREATE TABLE `token` (
  `id_token` int NOT NULL,
  `token` varchar(45) NOT NULL,
  `estado_token` tinyint NOT NULL,
  `Usuario_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `token`
--

INSERT INTO `token` (`id_token`, `token`, `estado_token`, `Usuario_id_usuario`) VALUES
(1, 'vUb9BrCteJ', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombres_usuario` varchar(45) NOT NULL,
  `apellidos_usuario` varchar(45) NOT NULL,
  `correo_usuario` varchar(45) NOT NULL,
  `password_usuario` varchar(300) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `estado_usuario` tinyint NOT NULL,
  `id_rol` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombres_usuario`, `apellidos_usuario`, `correo_usuario`, `password_usuario`, `fecha_creacion`, `estado_usuario`, `id_rol`) VALUES
(1, 'Admin', 'Admin', 'admin777@unah.edu.hn', '$2y$10$lUrHtz2T6IuzKoZPqHynLON8Nb6JCegTmPmmMpDyUFWcPXnwgxAg6', '2021-06-20 23:53:14', 1, 8),
(2, 'Luis Gerardo', 'Aguirre Cálix', 'laguirre@unah.edu.hn', '$2y$10$qMLbTIR9kyn3zQA/T93T3eVYpWMr4eSnd/R2njfg1QWg.kaKYpOZa', '2021-06-21 14:27:51', 1, 1),
(3, 'Emilson Omar', 'Acosta Giron', 'coordinacion.is@unah.edu.hn', '$2y$10$hkIXJZdg4etUaAoDm2YDpObbu1cbtLl3HqW9UHARLIU62Y3D6G4DG', '2021-06-21 16:26:56', 1, 3),
(4, 'Daniel Alejandro', 'Flores Pérez', 'coordinacion.ie@unah.edu.hn', '$2y$10$ZUnAvSizCajE1zR0qqxSW.4NaWnUBWciVG3lqa3fI1VTw9Ezfjn5C', '2021-06-21 16:45:15', 1, 4),
(5, 'Elena Maria', 'Lopez Mendez', 'rmendezl1997@unah.hn', '$2y$10$t5y6L9U557RGZ4qmw4pmzOQzYh88Dq.VvjOgDVJHcdYHVO55ip/4W', '2021-06-21 16:50:03', 1, 7),
(6, 'Oscar Vladimir', 'Ortiz Hernández', 'coordinacion.iq@unah.edu.hn', '$2y$10$0YoP42WQlkc2M2gz6zCKlenL32tROHUXn9wQgaaz/WqwVSuKjsGDK', '2021-06-21 22:10:41', 1, 6),
(7, 'Fernando José', 'Zorto Aguilera', 'coordinacion.im@unah.edu.hn', '$2y$10$vFaPDFLumJbIB54naBlZrOsbMvUgY/FusMqwTrWWFkodDDtQrGgea', '2021-06-22 14:33:38', 1, 5),
(8, 'Ana Paola', 'Padilla Ordoñez', 'appadilla@unah.hn', '$2y$10$ezSl6lJ3HxSXut2zTFCRxOqLyj3Lws9sGLi7i9.kSXrLR3LQmv79O', '2021-06-22 15:53:56', 1, 7),
(9, 'Luis Armando ', 'Sorto Hernandez ', 'luis.sorto@unah.hn', '$2y$10$9kTHpTP9HYBcdbG/A3BP2u.ayuugamTXoM/fnMZY1hmNXmS5jFAQ6', '2021-06-22 15:53:59', 1, 7),
(10, 'Cindy Marleny', 'Cámbar Donaire', 'cindy.cambar@unah.hn', '$2y$10$hnYDlgvm.pP3GTYzcyBv8uVdBHYqs0ZQ59B3Jtl7TMDJWgxFbsyc2', '2021-06-22 15:55:55', 1, 7),
(11, 'Alfa Mishell', 'Alvarez Herrera', 'alfa.alvarez@unah.hn', '$2y$10$WKEttodi0vzif2p0J2j5seVGFnNxLysyCAqQMiEupZj67HhkVgiK.', '2021-06-22 16:01:21', 1, 7),
(12, 'José Daniel', 'Gavarrete Herrera ', 'jose_gavarrete@unah.hn', '$2y$10$gTttVQDU5tOPoF9MBT7LVexVQDCJVd5L8Tki5F9h6bdWoi06lNGja', '2021-06-22 16:02:06', 1, 7),
(13, 'Jefry Enrique ', 'Maradiaga Zelaya', 'jefry.maradiaga@unah.hn', '$2y$10$caq85cDrR1EFSpSwcNFbUe/BnlTTr7jtftSKGJOV3XgAsSmXsJMDS', '2021-06-22 16:02:22', 1, 7),
(14, 'Karen Isabel ', 'Castellanos López', 'kicastellanos@unah.hn', '$2y$10$bZVcmO0jGu..ap98zMOFseIqX7SSrt/qslzYsAPCY43rJWqj00ez6', '2021-06-22 16:06:02', 1, 7),
(15, 'Fabricio Ismael', 'Murillo Urbina', 'fimurillo@unah.hn', '$2y$10$dplOViUWXnbxca5WrJomWe/alU7oHT38j9PDhtEHQ9lTo5GZwxsTi', '2021-06-22 16:06:11', 1, 7),
(16, 'Daniella ', 'Obando Rivera ', 'daniella.obando@unah.hn', '$2y$10$2Ew5AqLVIwZrIBEEgM6b.ONrPiBoOYVpoaJLnCcZM/Y88h5Aj25n2', '2021-06-22 16:06:39', 1, 7),
(17, 'Allan Arturo', 'López Varela', 'allan_lopez@unah.hn', '$2y$10$3r72E7HCURPdUbc/XvBfjOikgBLluY4ogxanMrt9cXThpeeiOQc46', '2021-06-22 16:06:52', 1, 7),
(18, 'Rosa Amalia', 'Cerrato Navarro', 'racerrato@unah.hn', '$2y$10$8Zqu6mI.WcqKxwzoKMIGxulJqNbY30drb6TuHMduN8MV.qZOO68um', '2021-06-22 16:07:39', 1, 7),
(19, 'Diana Teresa ', 'Torres Hernández ', 'dttorres@unah.hn', '$2y$10$.idFWT7TlBu8pefEA7faquhgPNC4jaZQ4OIOMjn6KFpyVB1NmwlwC', '2021-06-22 16:10:26', 1, 7),
(20, 'Ronald Alexander', 'Girón Sánchez', 'ragiron@unah.hn', '$2y$10$ml.6AbvKtZ.4NY4fVSRbEeSqlsmAHQqd9Po3MRbSwhJjDuNy17bQC', '2021-06-22 16:11:10', 1, 7),
(21, 'Nahun Ivan', 'Oliva Diaz', 'nahun.oliva@unah.hn', '$2y$10$yhsRUwNaFcABy7NwvQLRpO3He0GsH9FB6ACREdV1MVloMkdP5fPDa', '2021-06-22 16:12:13', 1, 7),
(22, 'Cristian Ariel ', 'Melendez Suazo', 'cmelendezs@unah.hn', '$2y$10$lp32bWxk0.bvxsvm45.ow.GqLu09pO8betx6xcTYvxAZAkwV7t6om', '2021-06-22 16:13:18', 1, 7),
(23, 'Marcio Orlando ', 'Cáceres Mendoza ', 'mocaceres@unah.hn', '$2y$10$jMRrK7IaXnvtoDxNRVb1U.ptx.jSeHrtKuvXXh4hN/y./6gaCxZMy', '2021-06-22 16:23:21', 1, 7),
(24, 'Alex Fernando ', 'Martinez Funez ', 'afmfunez@unah.hn', '$2y$10$dWVWDR1mQ3Re8cicleK4oeaucDpwXddbxJUPpSX77A/Hbyryuo6.m', '2021-06-22 16:23:29', 1, 7),
(25, 'Doris Michell', 'Sosa Amador', 'dmsosa@unah.hn', '$2y$10$UOsNV7G7.g54lcsct8XX8uwM9ARI3up7JrBTyUcfVAtolOFUh0qre', '2021-06-22 16:35:09', 1, 7),
(26, 'Hector Alonso', 'Machuca Chavarria', 'hmachuca@unah.hn', '$2y$10$AF54CeFWCXsQ3sybbE.zGeVKj5BR5CVi.KvObxq5d4TtQRFnQ.Lwm', '2021-06-22 16:40:03', 1, 7),
(27, 'Edgardo Isaias', 'Avila Alvarenga', 'edgardoalvarenga@unah.hn', '$2y$10$rDlhrOI4MjqVDXg94m4odO3HEQCkM2QrbtNhQ6ittzZd1JfjTKj4S', '2021-06-22 16:40:24', 1, 7),
(28, 'Levi Edgardo', 'Canales Blanco', 'levi.canales@unah.hn', '$2y$10$xBBuxTrbtKG/GGceK/FdeOtBVwTbJUg.y0OHnqJKMoSaQwPCeTKjC', '2021-06-22 16:42:58', 1, 7),
(29, 'Carlos Omar ', 'López Guerra', 'guerra_carlos@unah.hn', '$2y$10$MVfyteoLFXJNX.JG4lh0MuzocdLZI.8ihgWRgm8iHNE/TYOt6iyKy', '2021-06-22 16:44:15', 1, 7),
(30, 'Allan Jafect', 'Martínez Lagos', 'jafect.martinez@unah.hn', '$2y$10$/JcU10Tf5s5XGcHdb.NN0.2.cPXgKnXeosChHCSu4TPAXOv8lIP72', '2021-06-22 16:55:20', 1, 7),
(31, 'Yessi Jhaneth ', 'Benitez Benitez ', 'yessi.benitez@unah.hn', '$2y$10$HQOMQhTnZsX5YpOjeCFQsuYV/iRrExZxODHGyq5pJ6jrx8B1EJO7W', '2021-06-22 16:58:45', 1, 7),
(32, 'Jordan Fabricio', 'Izaguirre Godoy', 'jordan.izaguirre@unah.hn', '$2y$10$3TpipvdWACdWdnSWfNOmeOWj.8RqaQbKALmE22EjIEgysXUNi/Puu', '2021-06-22 17:18:00', 1, 7),
(33, 'Bessy Mariela', 'Velásquez Ramírez', 'bvelasquezr@unah.hn', '$2y$10$FoyuOAQ97LB8v.GgXRZtUOkSK4/4WKN9DhjBOJPW2OF955i4CkCqS', '2021-06-22 17:32:41', 1, 7),
(34, 'Karen Vanessa ', 'Suárez López ', 'karen.suarez@unah.hn', '$2y$10$nrWXHDWssW8E6FRis04NIuRl2mREpgvPAzzMx1gg18Jlj1FKfzVXW', '2021-06-22 17:35:08', 1, 7),
(36, 'Elver Howel', 'Espinal García', 'elver.espinal@unah.hn', '$2y$10$G1mJECjSN0.0A3BirZskpuBR9VVgDiu1VbYrcJtd1y7E.J9M6A04a', '2021-06-22 17:55:29', 1, 7),
(37, 'Luis Armando', 'Aguirre Centeno', 'laguirre@unah.hn', '$2y$10$FQcfcqIzRq6FOSBNgkk8au20QLpgEJlGXYdb2LcWXVeo9qklTuwxO', '2021-06-22 17:57:56', 1, 7),
(38, 'Joel schmid', 'Aguilera casco', 'joelaguilera@unah.hn', '$2y$10$OGu38CmFNzJlr.UAz7bMeewBzsTHcSu16wbOFzWqdUvsoEFtjrH8i', '2021-06-22 17:58:29', 1, 7),
(39, 'Evelyn Alejandra', ' Nuñez Nuñez', 'enunezn@unah.hn', '$2y$10$du9KEhdf/H/L1wgiQLqg1OaySW8HkfhegXafPxL2C1CcRla3TpkrC', '2021-06-22 18:35:02', 1, 7),
(40, 'Hermes Josue ', 'Romero Licona ', 'hermes.romero@unah.hn', '$2y$10$kA3i7tnG9RHCFM7xD.A1le8PKb/ZtitFxW0WtPvqjD/bB3Nppoc66', '2021-06-22 18:39:23', 1, 7),
(41, 'Alec David', 'Castro Castañeda', 'alec.castro@unah.hn', '$2y$10$kykTU9uYSERei0uiX.JEyOb0gvvUMuK3Oo/JoN5S7Z7fF4XybW3US', '2021-06-22 18:42:09', 1, 7),
(42, 'Oscar Ismael', 'Diaz Castillo', 'oidiaz@unah.hn', '$2y$10$FsDiNmdzxq.VhK5SF3sJRemMJ4iYLqNG0WRysKjZxzjraryW5.BzK', '2021-06-22 18:43:41', 1, 7),
(43, 'Joaquin Humberto', 'Estévez Mejia', 'joaquin.estevez@unah.hn', '$2y$10$kBI92ir8GaDTe/KWBB9IW.K8k.bq1oLMMUvpQ3WbvSdfKX2lHyvhm', '2021-06-22 18:45:28', 1, 7),
(44, 'Derek Fabricio', 'Aguilar Zuniga', 'derek.aguilar@unah.hn', '$2y$10$g366Kqf6ThyaNP7aKTJV2O6vb9r.9wePfmx5HWwNGm6OWSuP5bu6m', '2021-06-22 18:47:28', 1, 7),
(45, 'Eddie Josué', 'Amador Amador ', 'eddie.amador@unah.hn', '$2y$10$GAQc/hsXNlrMPwPX20fyqOCvuUaKp4vBKXszTKqCwIcvovgCxrqvq', '2021-06-22 18:48:39', 1, 7),
(46, 'ARNOLD JAVIER', 'IRIAS CASTILLO', 'arnold.irias@unah.hn', '$2y$10$R1cKDumORQpVk/9DxdV/JeGdEZaBZdY5oa0TkKzEcFGCBtcGQGw1u', '2021-06-22 19:10:46', 1, 7),
(47, 'Luis Miguel', 'Andino Andrade', 'lmandino@unah.hn', '$2y$10$NSHgCKEvpB/d1tgl514S2OMZPPM7YWpQ8CdvIz/inh1JrUFcLha36', '2021-06-22 19:52:48', 1, 7),
(48, 'Norman Eduardo ', 'Raudales Mejia ', 'norman_raudales@unah.hn', '$2y$10$Qe0udYZHf26FyFigtOSPo.u66ebgiQCq.kfzG/9PBRfT.P8CZQgc.', '2021-06-22 20:10:59', 1, 7),
(49, 'Lenyn Noel', 'Martínez Alemán', 'lenyn.martinez@unah.hn', '$2y$10$tMhfV2TvYt8DC.o5blZCCe7muwPRZIw5Y5bzfuRuBclbG8UMFzxY2', '2021-06-22 20:29:07', 1, 7),
(50, 'CARLOS JOSUE', 'LOPEZ SIERRA', 'clopezs@unah.hn', '$2y$10$BUK39FcYhd6z6uaA0jEwBO3lA4f2AdBN5Qwwg0yDnG16iXqd5cRjS', '2021-06-22 20:51:33', 1, 7),
(51, 'César David', 'Flores Oyuela', 'cdflores@unah.hn', '$2y$10$tAbhluL5CkAhO5uZV1w1r.z5uUmzI/36yjZ6.QyUEg44ATsiKRvB6', '2021-06-22 21:50:17', 1, 7),
(52, 'Allan Fernando ', 'Lara Rivera', 'aflara@unah.hn', '$2y$10$zK8MQKKCOaTGWKxkSRVe4.341Nb2yWcoVFpJ5rLgSbdE54te5AVbS', '2021-06-22 22:00:40', 1, 7),
(53, 'Carlos Andrés ', 'Romero Licona ', 'cromerol@unah.hn', '$2y$10$RG26xD6fP8/wFM36ZwWHiupSjQ0kxH0tSuBPlMKXrWs44AVNraBNW', '2021-06-22 22:19:39', 1, 7),
(54, 'Alexis Modesto', 'Amador Mejía', 'alexis.amador@unah.hn', '$2y$10$TfXGhVEl0S.PLdvwag9MFughDV8LHcmBNrWfzgAKFX0bS.wK/LWX2', '2021-06-22 22:24:09', 1, 7),
(55, 'Josue David', 'Cañadas Valladares', 'josue.canadas@unah.hn', '$2y$10$DzzgoKD6szkN4kzxmo4wmOC8ahwWF1U36oPAKCsJZhykNIyVoWFDS', '2021-06-22 22:46:08', 1, 7),
(56, 'Grecia Maria Mar ', 'Vega Reyes ', 'grecia.vega@unah.hn', '$2y$10$0MlWjGEcVARHeYeJ0DyHT.1K.nphVsjU8lbW1CkOTojeKj46osdRS', '2021-06-22 23:12:54', 1, 7),
(57, 'Ronaldo Enrrique', 'Cárcamo Vásquez', 'ronaldo.carcamo@unah.hn', '$2y$10$cezOptI0X.YLLqOSndwFS.J0gspv3izHrNveyZOWfCovzElM/0yVa', '2021-06-23 00:02:46', 1, 7),
(58, 'Cristian Alexis', 'Sánchez Ramos', 'sanchez.cristian@unah.hn', '$2y$10$1RfwymxFCxdNo7sn029iR.TnkDeal8T9kQKERyQxaXYVMoBXLmNT2', '2021-06-23 00:15:38', 1, 7),
(59, 'Cinthia Tonansi', 'Varela Varela', 'ctvarela@unah.hn', '$2y$10$7zimudvMc7yOjRcumQHKAuhFxjSL/dHK0C7l/eEZEGJgHe/cRegUy', '2021-06-23 01:21:39', 1, 7),
(60, 'Juan Ramón', 'Guevara Munoz', 'juan_guevara@unah.hn', '$2y$10$ERLEtK6geVXIR1IPHPMmIusCfmH595jRq5tzWbt7ZZ4aJ52CGThT2', '2021-06-23 01:37:01', 1, 7),
(61, 'Jonathan Fabricio', 'Galdamez Elias', 'jonathan.galdamez@unah.hn', '$2y$10$MMy/AVHPUqP8dAyTr3o.tO1dWs.EYtUPTLs4HrFPs5kc3Gxfw4aCq', '2021-06-23 01:43:07', 1, 7),
(62, 'Alex Antonio ', 'Cordoba Cruz', 'alex.cordoba@unah.hn', '$2y$10$hk1dgUYI2fqJkcYPR71NdOGigPbMeU7VzyjpnPUHnhMX2tttV6oRO', '2021-06-23 01:47:30', 1, 7),
(63, 'Davis Josue ', 'Mendez Hernandez', 'davis.mendez@unah.hn', '$2y$10$HjHi0as1ApKFeK6Dd3NtfuC3nt3BcjtDW5M3MCTrH64/P8zu/kST.', '2021-06-23 02:40:52', 1, 7),
(64, 'Elvin David ', 'Girón Mejía ', 'edgiron@unah.hn', '$2y$10$OEORVgwJMM92PJbG/czThetpafoFdKwLwk2fjoV95Q3mGmeDJVwbG', '2021-06-23 02:47:33', 1, 7),
(65, 'Alejandro José', 'Lanza Flores', 'alejandro.lanza@unah.hn', '$2y$10$xJz7V0TXTtiCO5BO.y72OOEXzGclG9F6GlomWKr.zzGT3P5NQZ7LK', '2021-06-23 03:43:44', 1, 7),
(66, 'Celeo Antonio', 'Escober López', 'celeo.escober@unah.hn', '$2y$10$UMKelHkTpGAUhfc9XFQMoeN2C0dzbYP0eNAIpb2LTHemlu2Sts99W', '2021-06-23 04:17:28', 1, 7),
(67, 'Erik Osayr', 'Linares Reyes', 'erik.linares@unah.hn', '$2y$10$sadgPjmyX71QLTf.AHQhJexsWxigCNztP.GF6mc9KMZuRyWaTURh2', '2021-06-23 04:24:40', 1, 7),
(68, 'Rafael Haziel', 'Ramírez Vides', 'rhramirez@unah.hn', '$2y$10$UpyJU1D3ZLapOb280GdSIuNEIVClV6QtAItnT2idD91pn2Edx8PUa', '2021-06-23 05:27:24', 1, 7),
(69, 'Osman Noé', 'Escoto Zepeda', 'osman.escoto@unah.hn', '$2y$10$KOB7F79dqLuXiNp0spj6COT3SqUa85zjrjMnYAG9MKM/F3yIU4e0S', '2021-06-23 05:35:43', 1, 7),
(70, 'Laura Suyapa', 'Barahona Hernández', 'lsbarahona@unah.hn', '$2y$10$o7DcZDJS.57LFjD26gum7uVKocCQDzW8k5GlLLDFYfxSSlSLdle2G', '2021-06-23 06:05:07', 1, 7),
(71, 'Thania Lizeth', 'Rodríguez Iglesias', 'thania.rodriguez@unah.hn', '$2y$10$R337TO8hH8U5bsREHutdFeWdCaWqafz8uJGaef8ud3H5vC6sRy9Lu', '2021-06-23 06:28:18', 1, 7),
(72, 'Edward Guillermo ', 'Rodríguez Vaquedano ', 'egrodriguezv@unah.hn', '$2y$10$iZ099szanJo4qFO5veJOguOC6EmM/Jju7jCusL7sMGCQpo.P.cTIi', '2021-06-23 13:22:53', 1, 7),
(73, 'Luis Armando', 'Tejada Murillo', 'ltejada@unah.hn', '$2y$10$DdKTbpp9WaBCHOTs.sIRjumo40EJkqhimkzimJz5YTHDw1VgY2Jkm', '2021-06-23 13:38:52', 1, 7),
(74, 'Allison Sofia', 'Sánchez Tomé', 'allison.sanchez@unah.hn', '$2y$10$LrHJ852IHmN1CnPwaRGHm.75BoLmcXO9z0Y.3z4LkhGzxBdK5LI6K', '2021-06-23 16:12:31', 1, 7),
(75, 'Hector Galileo', 'Gamez Avila', 'hector.gamez@unah.hn', '$2y$10$6W42USs/4Gqy8VsOUfVZsuut8C5glFWrav8WqzgT2RXOVAr7uP0qy', '2021-06-23 16:13:56', 1, 7),
(76, 'Jorge Wilfredo ', 'Cerrato Torres ', 'jwcerrato@unah.hn', '$2y$10$fLuDvvoaojFAQvcaX0JNKOIq/DccxdBM24zpzWHO1M2rr4xm0B.BO', '2021-06-23 17:08:08', 1, 7),
(77, 'Nathalie Giselle ', 'Mejía Ulloa ', 'nathalie.mejia@unah.hn', '$2y$10$jAEmXgSo97c1/11O/9wCEuTHxorw3a4oQLqZXbaMvRdE0b6g2zlOy', '2021-06-23 17:13:38', 1, 7),
(78, 'Emilson Omar', 'Acosta Giron', 'emilson.acosta@unah.edu.hn', '$2y$10$DMiwNJ8K9qPZJwur2fu13OZ4da21.WmwIuA.TLJRtjKxqwlffwnG2', '2021-06-23 17:13:42', 1, 8),
(79, 'Herbert Daniel', 'Chavarría Donaire', 'herbert.chavarria@unah.hn', '$2y$10$NPA.CUjuI.zJhpBWju.3sOtzooHMAGc46qMJwNCy4h5VtrddmSaCG', '2021-06-23 17:51:54', 1, 7),
(80, 'Gustavo Adolfo', 'Lozano Pineda', 'glozano@unah.hn', '$2y$10$IsGBanFDtCAYJUoN4SaEKOLQVjRe154kuF9mvHcFkPOwvSJ1CT93a', '2021-06-23 20:18:20', 1, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `fk_Cita_Usuario1_idx` (`id_usuario`),
  ADD KEY `fk_Cita_Estudiante1_idx` (`id_estudiante`);

--
-- Indices de la tabla `comentario_informacion`
--
ALTER TABLE `comentario_informacion`
  ADD PRIMARY KEY (`id_comentario_informacion`),
  ADD KEY `fk_Solicitud_Estudiante1_idx` (`id_estudiante`);

--
-- Indices de la tabla `descargas_estudiante`
--
ALTER TABLE `descargas_estudiante`
  ADD PRIMARY KEY (`id_descargas_estudiante`),
  ADD KEY `fk_Descargas_Estudiante_Estudiante1_idx` (`id_estudiante`);

--
-- Indices de la tabla `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`id_documento`),
  ADD KEY `fk_Documento_Solicitud1_idx` (`id_solicitud`);

--
-- Indices de la tabla `documentos_solicitud`
--
ALTER TABLE `documentos_solicitud`
  ADD PRIMARY KEY (`id_documentos_solicitud`);

--
-- Indices de la tabla `documento_estudiante`
--
ALTER TABLE `documento_estudiante`
  ADD PRIMARY KEY (`id_documento_estudiante`),
  ADD KEY `fk_Documento_Estudiante_Estudiante1_idx` (`id_estudiante`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD KEY `fk_Estudiante_Carrera1_idx` (`id_carrera`),
  ADD KEY `fk_Estudiante_Usuario1_idx` (`id_usuario`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`id_modulo`);

--
-- Indices de la tabla `otros_documentos`
--
ALTER TABLE `otros_documentos`
  ADD PRIMARY KEY (`id_otros_documentos`),
  ADD KEY `fk_Otros_Documentos_Carrera1_idx` (`id_carrera`);

--
-- Indices de la tabla `periodo_entregas`
--
ALTER TABLE `periodo_entregas`
  ADD PRIMARY KEY (`id_periodo_entregas`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `respuesta_documento`
--
ALTER TABLE `respuesta_documento`
  ADD PRIMARY KEY (`id_respuesta_documento`),
  ADD KEY `fk_Respuesta_Documento_Usuario1_idx` (`id_usuario`),
  ADD KEY `fk_Respuesta_Documento_Documento1_idx` (`id_documento`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rolxpermiso`
--
ALTER TABLE `rolxpermiso`
  ADD KEY `fk_Rol_Permiso1_idx` (`id_permiso`),
  ADD KEY `fk_RolUsuarioxPermiso_Rol1_idx` (`id_rol`),
  ADD KEY `fk_RolxPermiso_Modulo1_idx` (`id_modulo`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `fk_Solicitud_Estudiante1_idx` (`id_estudiante`);

--
-- Indices de la tabla `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `fk_token_Usuario1_idx` (`Usuario_id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_Usuario_Rol1_idx` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `id_carrera` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `comentario_informacion`
--
ALTER TABLE `comentario_informacion`
  MODIFY `id_comentario_informacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `descargas_estudiante`
--
ALTER TABLE `descargas_estudiante`
  MODIFY `id_descargas_estudiante` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documento`
--
ALTER TABLE `documento`
  MODIFY `id_documento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `documento_estudiante`
--
ALTER TABLE `documento_estudiante`
  MODIFY `id_documento_estudiante` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `id_modulo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `otros_documentos`
--
ALTER TABLE `otros_documentos`
  MODIFY `id_otros_documentos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `periodo_entregas`
--
ALTER TABLE `periodo_entregas`
  MODIFY `id_periodo_entregas` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `id_permiso` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `respuesta_documento`
--
ALTER TABLE `respuesta_documento`
  MODIFY `id_respuesta_documento` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id_solicitud` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `token`
--
ALTER TABLE `token`
  MODIFY `id_token` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `fk_Cita_Estudiante1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`),
  ADD CONSTRAINT `fk_Cita_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `fk_Documento_Solicitud1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`);

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `fk_Estudiante_Carrera1` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id_carrera`),
  ADD CONSTRAINT `fk_Estudiante_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `respuesta_documento`
--
ALTER TABLE `respuesta_documento`
  ADD CONSTRAINT `fk_Respuesta_Documento_Documento1` FOREIGN KEY (`id_documento`) REFERENCES `documento` (`id_documento`),
  ADD CONSTRAINT `fk_Respuesta_Documento_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `rolxpermiso`
--
ALTER TABLE `rolxpermiso`
  ADD CONSTRAINT `fk_Rol_Permiso1` FOREIGN KEY (`id_permiso`) REFERENCES `permiso` (`id_permiso`),
  ADD CONSTRAINT `fk_RolUsuarioxPermiso_Rol1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `fk_RolxPermiso_Modulo1` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`);

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `fk_Solicitud_Estudiante1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id_estudiante`);

--
-- Filtros para la tabla `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `fk_token_Usuario1` FOREIGN KEY (`Usuario_id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_Rol1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
