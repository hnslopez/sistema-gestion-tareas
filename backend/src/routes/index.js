/**
 * index.js - Rutas para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo de rutas de una tarea.
 * @see {@link module:taskRoutes.js}
 */
const taskRoutes = require("./taskRoutes");

/**
 * Importación del archivo de rutas principales.
 * @see {@link module:mainRoutes.js}
 */
const mainRoutes = require("./mainRoutes");

/**
 * Importación del archivo de rutas principales.
 * @see {@link module:userRoutes.js}
 */
const userRoutes = require("./userRoutes");

/**
 * Importación del archivo de rutas de autenticación.
 * @see {@link module:authRoutes.js}
 */
const authRoutes = require("./authRoutes");

/**
 * Exportación del archivo de rutas.
 * @type {object}
 */
module.exports = {
    taskRoutes,
    userRoutes,
    mainRoutes,
    authRoutes
}