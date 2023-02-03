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
const { Task } = require("../models");
const i18n = require("../utils/i18n");
const mongoose = require('mongoose');
/**
 * Obtiene todas las tareas y las devuelve en un objeto JSON.
 *
 * GET /
 *
 * @return {Array} Todas las tareas en la base de datos
 * @throws {Error} Si hay un error en la consulta a la base de datos
 */
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * Ver una tarea existente de la base de datos.
 *
 * GET /:id
 *
 * @param {String} req.params.id - ID de la tarea a mostrar
 * @return {Object} La tarea en la base de datos
 * @throws {Error} Si hay un error en la muestra de la tarea en la base de datos
 */
router.get("/:id", getTask, async (req, res) => {
    try {
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * Crea una nueva tarea en la base de datos.
 *
 * POST /
 *
 * @param {Object} req.body - El cuerpo de la solicitud con los detalles de la nueva tarea
 * @return {Object} La nueva tarea creada en la base de datos
 * @throws {Error} Si hay un error en la creación de la nueva tarea en la base de datos
 */
router.post("/", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });

    try {
        await task.save();
        res.status(201).json({message: i18n.__('tasks.created')});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

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
router.patch("/:id", getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title;
    }

    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    if (req.body.dueDate != null) {
        res.task.dueDate = req.body.dueDate;
    }
    try {
        await res.task.save();
        
        res.status(201).json({message: i18n.__('tasks.updated')});
    } catch (err) {
        res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
    }
});

/**
 * Elimina una tarea existente de la base de datos.
 *
 * DELETE /:id
 *
 * @param {String} req.params.id - ID de la tarea a eliminar
 * @return {Object} La tarea eliminada de la base de datos
 * @throws {Error} Si hay un error en la eliminación de la tarea en la base de datos
 */
router.delete("/:id", getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json({ message: i18n.__("task.deleted") });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * Función para obtener una tarea específica
 *
 * @param {Object} req - La solicitud de Express
 * @param {Object} res - La respuesta de Express
 * @param {Function} next - La siguiente función en la cadena de manejadores de middleware
 * @return {Object} La tarea solicitada
 * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
 */
async function getTask(req, res, next) {
    let task;
    let taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: req.__("errors.task_not_found",{}) });
      }

    try {
        task = await Task.findById(taskId);
        if (task == null) {
            return res.status(404).json({ message: req.__("errors.task_not_found") });
     
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.task = task;
    next();
}


module.exports = router;
