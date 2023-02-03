/**
 * index.js - Modelos para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo del modelo de una tarea.
 * @see {@link module:task.js}
 */
const Task = require("./task");

/**
 * Importación del archivo del modelo de un usuario.
 * @see {@link module:task.js}
 */
const User = require("./user");


/**
 * Exportación del archivo de rutas.
 * @type {object}
 */
module.exports = {
    Task,
    User
}