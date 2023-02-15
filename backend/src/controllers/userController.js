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
const i18n = require("i18n");
const mongoose = require('mongoose');

const UserController = {
  /**
   * Función  para registrar un nuevo usuario
   * @param {JSON} req - JSON con username, email y password
   * @returns {Object} - El usuario creado
   */
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: i18n.__("errors.missing_fields") });
    }

    try {
      const user = new User({ username, email, password });
      await user.save();
      res.json({ message: i18n.__("users.created") });
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: i18n.__("errors.generic"), error: err });
    }

  },

  /**
* Función para obtener una todos los usuarios
*
* @param {Object} req - La solicitud de Express
* @param {Object} res - La respuesta de Express
* @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
*/
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({ message: i18n.__("errors.generic"), error: err });
    }

  },

  /**
* Función para obtener un usuario específico
*
* @param {Object} req - La solicitud de Express
* @param {Object} res - La respuesta de Express
* @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra la tarea
*/
  getUser: async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: i18n.__("users.not_found", {}) });
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: i18n.__("users.not_found") });
      }
      res.user = user;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  /**
   * Función para actualizar un usuario específico
   * @param {Object} req - La solicitud de Express
   * @param {Object} res - La respuesta de Express
   * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra el usuario
  */
  updateUser: async (req, res) => {
    try {
      delete req.body.password;
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: i18n.__("users.not_found") });
      }
      res.json(user);
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: i18n.__("errors.generic"), error: err });
    }
  },
   /**
   * Función para eliminar un usuario específico
   * @param {Object} req - La solicitud de Express
   * @param {Object} res - La respuesta de Express
   * @throws {Error} Si hay un error en la consulta a la base de datos o si no se encuentra el usuario
   */
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: i18n.__("users.not_found") });
      }
      res.json({ message: i18n.__("users.deleted") });
    } catch (err) {
      res.status(400).json({ message: i18n.__("errors.generic"), error: err });
    }
  },
  /** 
  * Función para recuperar la contraseña de un usuario.
  *
  * @param {Object} req - La solicitud de Express
  * @param {Object} res - La respuesta de Express
  * @throws {Error} Si hay un error en la consulta a la base de datos o durante el envio del correo
  */
  forgotPassword: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: i18n.__("users.not_found") });
      }
      // TODO: Enviar correo electrónico para restablecer la contraseña
      res.json({ message: i18n.__("success.forgot_password_email_sent") });
    } catch (err) {
      res.status(400).json({ message: i18n.__("errors.generic"), error: err });
    }
  },

  /**
   * TODO: para utilizar se requiere login
   * Función para cambiar la contraseña de un usuario
   * @param {Object} req - La solicitud de Express
   * @param {Object} res - La respuesta de Express
   * @throws {Error} Si hay un error al actualizar la contraseña en la base de datos o si no se encuentra el usuario
   */
  changePassword: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(404).json({ message: i18n.__("users.not_found") });
      }
      user.password = await Encryption.encrypt(req.body.password);

      await user.save();
      res.json({ message: i18n.__("success.password_updated") });
    } catch (err) {
      res.status(400).json({ message: i18n.__("errors.generic"), error: err });
    }
  },

}


module.exports = UserController;
