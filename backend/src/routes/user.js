/**
 * task.js - Rutas para usuarios en Express
 *
 * Este archivo contiene las rutas para los usuarios en la aplicación de gestión de tareas.
 * Utiliza el modelo de usuarios en Mongoose para interactuar con la base de datos.
 *
 * Las operaciones disponibles incluyen:
 *  - Crear un nuevo usuario
 *  - Obtener todos los usuarios
 *  - Obtener un usuario por id
 *  - Actualizar un usuario
 *  - Eliminar un usuario
 */

const express = require("express");
const router = express.Router();
const { User } = require("../models");
const i18n = require("i18n");
const mongoose = require('mongoose');
const { UserController } = require("../controllers");


/**
 * Obtiene todos los usuarios y las devuelve en un objeto JSON.
 *
 * GET /
 *
 * @return {Array} Todos los usuarios en la base de datos
 * @throws {Error} Si hay un error en la consulta a la base de datos
 */
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});


/**
 * Ver un usuario existente de la base de datos.
 *
 * GET /:id
 *
 * @param {String} req.params.id - ID del usuario a mostrar
 * @return {Object} El usuario en la base de datos
 * @throws {Error} Si hay un error con el usuario en la base de datos
 */
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});


/**
 * Crea un nuevo usuario en la base de datos.
 *
 * POST /register
 *
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles del nuevo usuario
 * @return {Object} El nuevo usuario creada en la base de datos
 * @throws {Error} Si hay un error en la creación del nuevo usuario en la base de datos
 */
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    //Validación de nulos
    if (!username || !email || !password) {
        return res.status(400).json({ message: i18n.__("errors.missing_fields") });
    }
    try {
        await UserController.register({ username, email, password });
        res.json({ message: i18n.__("users.created")});
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});

/**
 * Actualiza un nuevo usuario existente en la base de datos.
 *
 * PATCH /:id
 *
 * @param {String} req.params.id - ID del nuevo usuario a actualizar
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles deL usuario actualizado
 * @return {Object} El usuario actualizado en la base de datos
 * @throws {Error} Si hay un error en la actualización del usuario en la base de datos
 */
router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});



/**
 * Elimina un usuario existente de la base de datos.
 *
 * DELETE /:id
 *
 * @param {String} req.params.id - ID del usuario a eliminar
 * @return {Object} El usuario eliminada de la base de datos
 * @throws {Error} Si hay un error en la eliminación del usuario en la base de datos
 */
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        res.json({ message: i18n.__("users.deleted") });
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});

/**
 * Recuperar la contraseña de un usuario.
 *
 * POST /forgot-password
 *
 * @param {String} req.body.email - Email del usuario
 * @return {Object} Mensaje de éxito o error
 * @throws {Error} Si hay un error al enviar el correo electrónico
 */
router.post("/forgot-password", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        // Enviar correo electrónico para restablecer la contraseña
        res.json({ message: i18n.__("success.forgot_password_email_sent") });
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});


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
router.put("/change-password", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        user.password = req.body.password;
        await user.save();
        res.json({ message: i18n.__("success.password_updated") });
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});

/**
 * Ver el perfil de un usuario.
 *
 * GET /profile
 *
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Object} El perfil del usuario
 * @throws {Error} Si hay un error al recuperar el perfil del usuario en la base de datos
 */
router.get("/profile", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});

/**
 * Editar el perfil de un usuario.
 *
 * PUT /profile
 *
 * @param {Object} req.body - Datos actualizados del usuario
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Object} Mensaje de éxito o error
 * @throws {Error} Si hay un error al actualizar el perfil del usuario en la base de datos
 */
router.put("/profile", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        // Actualizar los datos del usuario
        await user.save();
        res.json({ message: i18n.__("success.profile_updated") });
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});

/**
 * Refrescar el token de un usuario.
 *
 * POST /refresh
 *
 * @param {String} req.headers.authorization - Token de autorización
 * @return {Object} Nuevo token de acceso y de actualización
 * @throws {Error} Si hay un error al generar el nuevo token
 */
router.post("/refresh", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: i18n.__("errors.user_not_found") });
        }
        // Generar nuevos tokens de acceso y actualización
        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});



module.exports = router;
