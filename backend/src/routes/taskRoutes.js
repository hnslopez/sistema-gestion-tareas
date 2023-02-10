/**
 * task.js - Rutas para tareas en Express
 *
 * Este archivo contiene las rutas para las tareas en la aplicación de gestión de tareas.
 * Utiliza el modelo de tarea en Mongoose para interactuar con la base de datos.
 *
 * Las operaciones disponibles incluyen:
 *  - Obtener todas las tareas
 *  - Obtener una tarea
 *  - Crear una nueva tarea
 *  - Actualizar una tarea
 *  - Eliminar una tarea
 */

const express = require("express");
const router = express.Router();
const { taskController } = require("../controllers");
/**
 * Obtiene todas las tareas y las devuelve en un objeto JSON.
 *
 * GET /
 *
 * @return {Array} Todas las tareas en la base de datos
 * @throws {Error} Si hay un error en la consulta a la base de datos
 */
router.get("/", taskController.getAllTasks);

/**
 * Ver una tarea existente de la base de datos.
 *
 * GET /:id
 *
 * @param {String} req.params.id - ID de la tarea a mostrar
 * @return {Object} La tarea en la base de datos
 * @throws {Error} Si hay un error en la muestra de la tarea en la base de datos
 */
router.get("/:id", taskController.getTask,(req, res)=> res.json(res.task));


/**
 * Crea una nueva tarea en la base de datos.
 *
 * POST /
 *
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles de la nueva tarea
 * @return {Object} La nueva tarea creada en la base de datos
 * @throws {Error} Si hay un error en la creación de la nueva tarea en la base de datos
 */
router.post("/", taskController.createTask);

/**
 * Actualiza una tarea existente en la base de datos.
 *
 * PATCH /:id
 *
 * @param {String} req.params.id - ID de la tarea a actualizar
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles de la tarea actualizada
 * @return {Object} La tarea actualizada en la base de datos
 * @throws {Error} Si hay un error en la actualización de la tarea en la base de datos
 */
router.patch("/:id", taskController.getTask, taskController.updateTask);

/**
 * Elimina una tarea existente de la base de datos.
 *
 * DELETE /:id
 *
 * @param {String} req.params.id - ID de la tarea a eliminar
 * @return {Object} La tarea eliminada de la base de datos
 * @throws {Error} Si hay un error en la eliminación de la tarea en la base de datos
 */
router.delete("/:id", taskController.getTask, taskController.deleteTask);



module.exports = router;
