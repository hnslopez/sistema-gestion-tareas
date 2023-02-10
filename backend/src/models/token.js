const mongoose = require("mongoose");

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
  // Campo requerido de tipo Date para almacenar la fecha de expiración del token
  expiresAt: {
    type: Date,
    required: true,
  },
  // Campo opcional de tipo Boolean para indicar si el token ha sido revocado o no
  revoked: {
    type: Boolean,
    default: false
  }
});



const Token = mongoose.model("Token", tokenSchema);

// Exportar los modelos de User y Token
module.exports = Token;
