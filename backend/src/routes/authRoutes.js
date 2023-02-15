/**

authRoutes.js - Rutas de autenticación en Express
Este archivo contiene las rutas para la autenticación en la aplicación.
Utiliza el middleware de autenticación para garantizar la seguridad y validar las solicitudes.
Las operaciones disponibles incluyen:

 *  - Inicio de sesión de usuario
 *  - Refresco de token de inicio de sesión
 *  - Finalización de sesión de usuario
*/

const express = require("express");
const { authController } = require("../controllers");
const { notAuthenticated } = require("../controllers/authController");
const { authenticateLocal, authenticateJwt } = require("../middlewares/authentication");
const router = express.Router();


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
router.post("/login", notAuthenticated , authenticateLocal, authController.login);

/**
 * Refrescar el token de un usuario.
 *
 * POST /refresh
 *
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Object} Nuevo token de acceso y de actualización
 * @throws {Error} Si hay un error al generar el nuevo token
 */
router.post("/refresh", authenticateJwt, authController.refreshToken);


/**
 * 
 * Cerrar sesión del usuario.
 * POST /logout
 * @param {String} req.headers.authorization - Token de autorización
 * @returns {Object} Objeto JSON con un mensaje de éxito
 * @throws {Error} Si hay un error al procesar la solicitud de cierre de sesión
*/
router.post("/logout", authenticateJwt, authController.logout);

module.exports = router;
