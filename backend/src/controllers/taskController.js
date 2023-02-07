/**
 * tasksController.js - Controlador para tareas en MongoDB
 * Este archivo contiene la lógica para interactuar con la base de datos MongoDB para las tareas.
 * Incluye funciones para realizar operaciones CRUD en la base de datos.
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
const { TaskStatus } = require("../common/enum");

const TaskController = {

    /**
     * Obtener todas las tareas
     *
     * @param {Object} req - Solicitud del usuario
     * @param {Object} res - Respuesta del servidor
     */
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find();
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    /**
 * Función para obtener una tarea específica
 *
 * @param {Object} req - La solicitud de Express
 * @param {Object} res - La respuesta de Express
 * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
 */
    getTask: async (req, res, next) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: req.__("errors.task_not_found", {}) });
        }
        
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
              return res.status(404).json({ message: req.__("errors.task_not_found") });
            }
            res.task = task;
            next();
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
    },
    /**
 * Función para crear una tarea específica
 *
 * @param {Object} req - La solicitud de Express
 * @param {Object} res - La respuesta de Express
 * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
 */
    createTask: async(req, res) => {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        });
        try {
            await task.save();
            res.status(201).json({ message: i18n.__('tasks.created') });
        } catch (err) {
            res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
        }
    },
        /**
 * Función para actualizar una tarea específica
 *
 * @param {Object} req - La solicitud de Express
 * @param {Object} res - La respuesta de Express
 * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
 */

    updateTask: async(req, res) =>  {
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
            return res.status(400).json({ message: i18n.__("errors.status_not_valid")});
        }
    
            res.task.updatedAt = new Date();
    
        try {

            let task = await Task.findByIdAndUpdate(req.params.id,res.task,{ new: true})
            console.log(task)
            await task.save()

            res.status(201).json({ message: i18n.__('tasks.updated') });

       
        } catch (err) {
            res.status(400).json({ message: i18n.__("errors.generic_error"), error: err });
        }
    },
        /**
    * Función para eliminar una tarea específica
    *
    * @param {Object} req - La solicitud de Express
    * @param {Object} res - La respuesta de Express
    * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
    */
   deleteTask: async(req, res) => {
    try {
        await res.task.remove();
        res.json({ message: i18n.__("task.deleted") });
    } catch (err) {
        res.status(500).json({ message: i18n.__("errors.generic_error"), error: err });

    }
}

}


module.exports = TaskController;

