/**
 * index.js - Rutas para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo de rutas de una tarea.
 * @see {@link module:task.js}
 */
const taskRoutes = require("./task");

/**
 * Importación del archivo de rutas principales.
 * @see {@link module:main.js}
 */
const mainRoutes = require("./main");

/**
 * Importación del archivo de rutas principales.
 * @see {@link module:user.js}
 */
const userRoutes = require("./user");


/**
 * Exportación del archivo de rutas.
 * @type {object}
 */
module.exports = {
    taskRoutes,
    userRoutes,
    mainRoutes
}