/**
 * tasksController.js - Controlador para tareas en MongoDB
 * Este archivo contiene la lógica para interactuar con la base de datos MongoDB para las tareas.
 * Incluye funciones para realizar operaciones CRUD en la base de datos.
 * Las operaciones disponibles incluyen:
 *  - Obtener todas las tareas de un usuario
 *  - Obtener una tarea de un usuario
 *  - Crear una nueva tarea para un usuario
 *  - Actualizar una tarea de un usuario
 *  - Eliminar una tarea de un usuario
*/

const { Task } = require("../models");
const i18n = require("../utils/i18n");
const mongoose = require('mongoose');
const { TaskStatus } = require("../common/enum");

const TaskController = {

    /**
     * Función para obtener todas las tareas de un usuario
     *
     * @param {Object} req - Solicitud del usuario
     * @param {Object} res - Respuesta del servidor
     */
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find({ user: req.user._id });
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    /**
     * Función para obtener una tarea específica de un usuario
     *
     * @param {Object} req - La solicitud de Express
     * @param {Object} res - La respuesta de Express
     * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
     */
    getTask: async (req, res, next) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: req.__("tasks.not_found", {}) });
        }

        try {
            const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
            if (!task) {
                return res.status(404).json({ message: req.__("tasks.not_found") });
            }
            res.task = task;
            next();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    /**
     * Función para crear una tarea específica para un usuario
     *
     * @param {Object} req - La solicitud de Express
     * @param {Object} res - La respuesta de Express
     * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra el usuario
     */
    createTask: async (req, res) => {

        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            user: req.user._id
        });
        try {
            await task.save();
            res.status(201).json({ message: i18n.__('tasks.created') });
        } catch (err) {
            res.status(400).json({ message: i18n.__("errors.generic"), error: err });
        }
    },


    /**
     * Función para actualizar una tarea específica para el usuario
     *
     * @param {Object} req - La solicitud de Express
     * @param {Object} res - La respuesta de Express
     * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
     */

    updateTask: async (req, res) => {

        if (req.body.title != null) {
            res.task.title = req.body.title;
        }

        if (req.body.description != null) {
            res.task.description = req.body.description;
        }

        if (req.body.status != null && Object.values(TaskStatus).includes(req.body.status)) {
            res.task.status = req.body.status;
        }

        //Valida si el contenido enviado dentro "status" es uno de los enum "TaskStatus" 
        if (!(Object.values(TaskStatus).includes(req.body.status))) {
            return res.status(400).json({ message: i18n.__("errors.status_not_valid") });
        }

        res.task.updatedAt = new Date();

        try {
            let task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

            if (!task) {
                return res.status(404).json({ message: i18n.__("tasks.not_found") });
            }

            task.title = res.task.title;
            task.description = res.task.description;
            task.status = res.task.status;
            task.updatedAt = res.task.updatedAt;

            await task.save();

            res.status(201).json({ message: i18n.__('tasks.updated') });
        } catch (err) {
            res.status(400).json({ message: i18n.__("errors.generic"), error: err });
        }
    },


    /**
    * Función para eliminar una tarea específica del usuario
    *
    * @param {Object} req - La solicitud de Express
    * @param {Object} res - La respuesta de Express
    * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea o si el usuario no es el dueño de la tarea
    */
    deleteTask: async (req, res) => {
        try {
            // Verificar si el usuario es el dueño de la tarea
            if (req.user._id.toString() !== res.task.user.toString()) {
                return res.status(401).json({ message: i18n.__("errors.not_authorized") });
            }

            await res.task.remove();
            res.json({ message: i18n.__("task.deleted") });
        } catch (err) {
            res.status(500).json({ message: i18n.__("errors.generic"), error: err });
        }
    }

}


module.exports = TaskController;

