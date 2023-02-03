const { User } = require('../models')
const { Encryption } = require('../common/helper')

const UserController = {
  /**
   * Registrare un nuevo usuario
   * @param {Object} req - La solicitud de Express
   * @param {Object} res - La respuesta de Express
   * @returns {Object} - El usuario creado
   */
  async register(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = await Encryption.encrypt(password);
    const user = new User({ name, email, password: encryptedPassword });
    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  }
}


module.exports = UserController;

