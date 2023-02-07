/**
 * main.js - Rutas para tareas en Express (TO DO)
 *
 * Este archivo contiene la ruta principal para la aplicación de gestión de tareas.
 *
 * Las operaciones disponibles incluyen:
 * 
 */

var express = require('express');
var router = express.Router();

/**
 * Obtiene todas las tareas y las devuelve en un objeto JSON.
 *
 * GET /
 *
 * @return {String} Mensaje de funcionamiento correcto del API (TO DO)
 */
router.get('/', function(req, res, next) {
  res.send('Funciona');
});

module.exports = router;