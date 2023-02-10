const mongoose = require("mongoose");

// Definir el esquema del modelo de token
const tokenSchema = new mongoose.Schema({
  // Campo requerido de tipo String para almacenar el token
  token: {
    type: String,
    required: true
  },
  // Referencia al usuario al que pertenece el token
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // Campo requerido de tipo Date para almacenar la fecha de creación del token
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Campo requerido de tipo String para almacenar el tipo de dispositivo
  deviceType: {
    type: String,
    required: true
  },
  // Campo requerido de tipo String para almacenar el navegador
  browser: {
    type: String,
    required: true
  },
});


const Token = mongoose.model("Token", tokenSchema);

// Exportar los modelos de User y Token
module.exports = Token;
