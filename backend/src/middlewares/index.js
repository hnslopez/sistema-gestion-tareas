/**
 * index.js - Middlewares para Express 
 * 
 * Archivo principal de exportación.
 * @module index
 */

/**
 * Importación del archivo del middleware para manejar errores.
 * @see {@link module:errorHandling.js}
 */
const errorHandling = require("./errorHandling");

/**
 * Importación del archivo del middleware de rateLimiter.
 * @see {@link module:rateLimit.js}
 */
const rateLimiterMiddleware = require("./rateLimiter");

/**
 * Importación del archivo del middleware de cors.
 * @see {@link module:cors.js}
 */
//const corsMiddleware = require("./cors");

/**
 * Importación del archivo del middleware de error de rutas.
 * @see {@link module:routeErrorHandler.js}
 */
const routeErrorHandler = require("./routeErrorHandler");



/**
 * Exportación del archivo de middlewaares.
 * @type {object}
 */
module.exports = {
    errorHandling,
    rateLimiterMiddleware,
    routeErrorHandler

 //   corsMiddleware
}