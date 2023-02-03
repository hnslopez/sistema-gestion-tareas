/**
 * index.js - Modelos para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo del controlador de una tarea.
 * @see {@link module:task.js}
 */
const TaskController = require("./task");

/**
 * Importación del archivo del controlador de un usuario.
 * @see {@link module:user.js}
 */
const UserController = require("./user");


/**
 * Exportación del archivo de rutas.
 * @type {object}
 */
module.exports = {
    TaskController,
    UserController
}