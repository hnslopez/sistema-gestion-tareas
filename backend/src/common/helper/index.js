/**
 * index.js - Helpers para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo del modelo de una tarea.
 * @see {@link module:encryption.js}
 */
const Encryption = require("./encryption");


/**
 * Exportación del archivo de rutas.
 * @type {object}
 */
module.exports = {
    Encryption
}