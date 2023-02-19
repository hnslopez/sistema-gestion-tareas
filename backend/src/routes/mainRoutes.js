/**
 * main.js - Rutas para tareas en Express (TO DO)
 *
 * Este archivo contiene la ruta principal para la aplicación de gestión de tareas.
 *
 * Las operaciones disponibles incluyen:
 * 
 */

var express = require('express');
const i18n = require('../utils/i18n');
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

/**
 * Configuración para ver el idioma en el que esta el frontend.
 *
 */
router.use(i18n.setLang);

/**
 * Configura una cookie para probar el idioma.
 *
 * GET /
 *
 * @return {String} Mensaje de cookie establecida correctamente
 */
router.get('/set-cookie', (req, res) => {
  res.cookie('lang', 'en', { maxAge: 900000, httpOnly: true });
  res.send('Cookie establecida');
});

module.exports = router;