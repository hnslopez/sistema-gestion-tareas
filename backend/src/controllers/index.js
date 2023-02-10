/**
 * index.js - Modelos para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo del controlador de una tarea.
 * @see {@link module:taskController.js}
 */
const taskController = require("./taskController");

/**
 * Importación del archivo del controlador de un usuario.
 * @see {@link module:userController.js}
 */
const userController = require("./userController");

/**
 * Importación del archivo del controlador de autorización.
 * @see {@link module:authController.js}
 */
const authController = require("./authController");

/**
 * Exportación del archivo de rutas.
 * @type {object}
 */
module.exports = {
    taskController,
    userController,
    authController
}