const mongoose = require("mongoose");
const { Encryption } = require("../common/helper");

// Definir el esquema del modelo de tarea
const userSchema = new mongoose.Schema({
  // Campo requerido de tipo String para almacenar el nombre de usuario
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Campo requerido de tipo String para almacenar la contraseña
  password: {
    type: String,
    required: true
  },
  // Campo requerido de tipo String para almacenar el correo
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Campo requerido de tipo String para almacenar los tokens generados para el usuario
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

  // Antes de ingresar la contraseña del usuario a la base de datos, esta se encripta
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await Encryption.hash(user.password, 8);
  }
  next();
});

// Crear el modelo de User a partir del esquema
const User = mongoose.model("User", userSchema);

// Exportar el modelo de user 
module.exports = User;