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

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserController.register({ name, email, password });
        res.json({ message: i18n.__("users.created"), user });
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});


module.exports = router;
