import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mongodb',
  templateUrl: './mongodb.component.html',
  styleUrls: ['./mongodb.component.css']
})
export class MongodbComponent implements OnInit {

  code= `// Defining the user schema
  const userSchema = new mongoose.Schema({
      username: {
          type: String,
          required: true,
          unique: true,
          trim: true
      },
      password: {
          type: String,
          required: true,
          select: false 
      },
      email: {
          type: String,
          required: true,
          unique: true,
          trim: true
      }
  });

  // Creating the User model from the schema
  const User = mongoose.model("User", userSchema);

  // Exporting the User model
  module.exports = User;`

  codeTask = `const mongoose = require("mongoose");
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
`

codeQuerys = `// Obtener todas las tareas en progreso
const tasksInProgress = await Task.find({ status: 'in progress' });

// Obtener las tareas completadas en los últimos 7 días
const tasksCompletedLastWeek = await Task.find({
  status: 'done',
  createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
});
`;
  constructor() { }

  ngOnInit(): void {
  }

}
