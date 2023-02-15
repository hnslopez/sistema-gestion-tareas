/**
 * task.js - Rutas para tareas en Express
 *
 * Este archivo contiene las rutas para las tareas en la aplicación de gestión de tareas.
 * Utiliza el modelo de tarea en Mongoose para interactuar con la base de datos.
 *
 * Las operaciones disponibles incluyen:
 *  - Obtener todas las tareas del usuario
 *  - Obtener una tarea del usuario
 *  - Crear una nueva tarea del usuario
 *  - Actualizar una tarea del usuario
 *  - Eliminar una tarea del usuario
 */

const express = require("express");
const router = express.Router();
const { taskController } = require("../controllers");
const { authenticateJwt } = require("../middlewares/authentication");
/**
 * Obtiene todas las tareas del usuario y las devuelve en un objeto JSON.
 *
 * GET /
 *
 * @return {Array} Todas las tareas en la base de datos
 * @throws {Error} Si hay un error en la consulta a la base de datos
 */
router.get("/", authenticateJwt, taskController.getAllTasks);

/**
 * Ver una tarea del usuario existente de la base de datos.
 *
 * GET /:id
 *
 * @param {String} req.params.id - ID de la tarea a mostrar
 * @return {Object} La tarea en la base de datos
 * @throws {Error} Si hay un error en la muestra de la tarea en la base de datos
 */
router.get("/:id", authenticateJwt, taskController.getTask, (req, res) => res.json(res.task));


/**
 * Crea una nueva tarea del usuario en la base de datos.
 *
 * POST /
 *
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles de la nueva tarea del usuario
 * @return {Object} La nueva tarea creada del usuario en la base de datos
 * @throws {Error} Si hay un error en la creación de la nueva tarea del usuario en la base de datos
 */
router.post("/", authenticateJwt, taskController.createTask);

/**
 * Actualiza una tarea del usuario existente en la base de datos.
 *
 * PATCH /:id
 *
 * @param {String} req.params.id - ID de la tarea a actualizar
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles de la tarea actualizada
 * @return {Object} La tarea actualizada en la base de datos
 * @throws {Error} Si hay un error en la actualización de la tarea en la base de datos
 */
router.patch("/:id", authenticateJwt, taskController.getTask, taskController.updateTask);

/**
 * Elimina una tarea del usuario existente de la base de datos.
 *
 * DELETE /:id
 *
 * @param {String} req.params.id - ID de la tarea a eliminar
 * @return {Object} La tarea eliminada de la base de datos
 * @throws {Error} Si hay un error en la eliminación de la tarea en la base de datos
 */
router.delete("/:id", authenticateJwt, taskController.getTask, taskController.deleteTask);



module.exports = router;
