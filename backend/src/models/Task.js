const mongoose = require("mongoose");
const { TaskStatus } = require("../common/enum");

// Definir el esquema del modelo de tarea
const taskSchema = new mongoose.Schema({
  // Campo requerido de tipo String para almacenar el título de la tarea
  title: {
    type: String,
    required: true,
    trim: true
  },
  // Campo requerido de tipo String para almacenar la descripción de la tarea
  description: {
    type: String,
    required: true,
    trim: true
  },
  // Campo opcional de tipo String para almacenar el estado de la tarea
  status: {
    type: String,
    // Valor por defecto: "to do"
    default: TaskStatus.TO_DO,
    // Restringir los valores permitidos a "to do", "in progress" y "done"
    enum: TaskStatus
  },
  // Campo opcional de tipo Date para almacenar la fecha y hora de creación de la tarea
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Campo opcional de tipo Date para almacenar la fecha y hora de actualización de la tarea
  updatedAt: {
    type: Date,
    default: Date.now 
  }
});

// Crear el modelo de tarea a partir del esquema
const Task = mongoose.model("Task", taskSchema);
   
// Exportar el modelo de tarea
module.exports = Task;