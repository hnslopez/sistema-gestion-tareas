/**

 * userController.js - Controlador para usuarios en Express
 * Este archivo contiene la lógica para las rutas de usuario en la aplicación.
 * Utiliza el modelo de usuario en Mongoose para interactuar con la base de datos.
 * Las operaciones disponibles incluyen:
 *  - Obtener un usuario por su ID
 *  - Registrar un usuario nuevo en la base de datos.
 *  - Enviar un correo electrónico para recuperar la contraseña
 *  - Cambiar la contraseña de un usuario
 *  - Ver el perfil de un usuario
 *  - Actualizar el perfil de un usuario
 *  - Refrescar el token de inicio de sesión de un usuario
*/


const { User } = require('../models')
const { Encryption } = require('../common/helper')

const UserController = {
  /**
   * Registrare un nuevo usuario
   * @param {JSON} req - JSON con username, email y password
   * @returns {Object} - El usuario creado
   */
  async register(req) {
    const { username, email, password } = req;
    const encryptedPassword = await Encryption.encrypt(password);
    const user = new User({ username, email, password: encryptedPassword });
    const savedUser = await user.save();
    return savedUser;
  }
}


module.exports = UserController;

