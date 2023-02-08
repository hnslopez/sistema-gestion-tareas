/**

authRoutes.js - Rutas de autenticación en Express
Este archivo contiene las rutas para la autenticación en la aplicación.
Utiliza el middleware de autenticación para garantizar la seguridad y validar las solicitudes.
Las operaciones disponibles incluyen:

 *  - Inicio de sesión de usuario
 *  - Refresco de token de inicio de sesión
 *  - Verificación de token de inicio de sesión
 *  - Finalización de sesión de usuario
 *  - Protección de rutas requiriendo autenticación
*/

const express = require("express");
const router = express.Router();


/**
 * Verificar si el usuario está autenticado.
 *
 * GET /verify
 *
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Boolean} Verdadero si el usuario está autenticado
 * @throws {Error} Si hay un error en la verificación del token
 */
//router.get("/verify", authentication, AuthController.verifyToken);

/**
 * Iniciar sesión de un usuario.
 *
 * POST /login
 *
 * @param {String} req.body.username - Nombre del usuario
 * @param {String} req.body.password - Contraseña del usuario
 * @return {Object} Token de acceso y de actualización
 * @throws {Error} Si hay un error al iniciar sesión
 */
router.post("/login", AuthController.login);

/**
 * Refrescar el token de un usuario.
 *
 * POST /refresh
 *
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Object} Nuevo token de acceso y de actualización
 * @throws {Error} Si hay un error al generar el nuevo token
 */
//router.post("/refresh", authentication, AuthController.refreshToken);


module.exports = router;
