/**

userRoutes.js - Rutas para usuarios en Express
Este archivo contiene las rutas para los usuarios en la aplicación.
Utiliza el modelo de usuario en Mongoose para interactuar con la base de datos.
Las operaciones disponibles incluyen:
 *  - Ver un usuario existente
 *  - Registrar usuario
 *  - Recuperar contraseña
 *  - Cambiar contraseña
 *  - Ver perfil
 *  - Editar perfil
 *  - Refrescar token de inicio de sesión
*/

const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { notAuthenticated } = require("../controllers/authController");
const { authenticateJwt } = require("../middlewares/authentication");

/** TODO: Solo acceso adminds
 * Obtiene todos los usuarios y las devuelve en un objeto JSON.
 *
 * GET /
 *
 * @return {Array} Todos los usuarios en la base de datos
 * @throws {Error} Si hay un error en la consulta a la base de datos
 */
router.get("/",  userController.getAllUsers);


/** TODO: Solo acceso adminds
 * Ver un usuario existente de la base de datos.
 *
 * GET /:id
 *
 * @param {String} req.params.id - ID del usuario a mostrar
 * @return {Object} El usuario en la base de datos
 * @throws {Error} Si hay un error con el usuario en la base de datos
 */
//router.get("/:id", userController.getUser, (req, res) => res.json(res.user));


/**
 * Crea un nuevo usuario en la base de datos.
 *
 * POST /register
 *
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles del nuevo usuario
 * @return {Object} El nuevo usuario creada en la base de datos
 * @throws {Error} Si hay un error en la creación del nuevo usuario en la base de datos
 */
router.post('/register',notAuthenticated , userController.register);

/**
 * Actualiza un usuario existente en la base de datos.
 *
 * PATCH /:id
 *
 * @param {String} req.params.id - ID del nuevo usuario a actualizar
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles deL usuario actualizado
 * @return {Object} El usuario actualizado en la base de datos
 * @throws {Error} Si hay un error en la actualización del usuario en la base de datos
 */
router.patch("/:id", authenticateJwt, userController.updateUser);



/**  TODO: Solo acceso adminds
 * Elimina un usuario existente de la base de datos.
 *
 * DELETE /:id
 *
 * @param {String} req.params.id - ID del usuario a eliminar 
 * @return {Object} El usuario eliminada de la base de datos
 * @throws {Error} Si hay un error en la eliminación del usuario en la base de datos
 */
router.delete("/:id", userController.deleteUser);

/**
 * Recuperar la contraseña de un usuario.
 *
 * POST /forgot-password
 *
 * @param {String} req.body.email - Email del usuario
 * @return {Object} Mensaje de éxito o error
 * @throws {Error} Si hay un error al enviar el correo electrónico
 */
router.post("/forgot-password",userController.forgotPassword);


/**
 * Cambiar la contraseña de un usuario.
 *
 * PUT /change-password
 *
 * @param {String} req.body.password - Nueva contraseña del usuario
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Object} Mensaje de éxito o error
 * @throws {Error} Si hay un error al actualizar la contraseña en la base de datos
 */
router.put("/change-password", authenticateJwt, userController.changePassword);


module.exports = router;
