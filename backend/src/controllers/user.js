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

