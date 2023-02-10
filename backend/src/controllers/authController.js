/**

authController.js - Controlador de autenticación en Express
Este archivo contiene la lógica de autenticación de la aplicación.
Las operaciones disponibles incluyen:
 *  - Inicio de sesión de usuario
 *  - Refresco de token de inicio de sesión
 *  - Verificación de token de inicio de sesión
 *  - Finalización de sesión de usuario
 *  - Protección de rutas requiriendo autenticación

*/

const { signToken } = require("../middlewares/authentication");
const { Token } = require("../models");
const i18n = require("i18n");


const authController = {

  /**
   * Función de inicio de sesión
   * @param {Object} req - Objeto de petición, debe contener un objeto de usuario
   * @param {Object} res - Objeto de respuesta
   * @returns {Object} - Devuelve un objeto JSON con el token de acceso
   */
  login: async (req, res) => {
    const { accessToken, refreshToken } = await signToken(req.user._id);
    const expiresIn = process.env.JWT_ACCESS_TOKEN_TIME || '15m';
    const expiresAt = new Date(Date.now() + expiresIn);

    const newToken = new Token({
      token: refreshToken,
      user: req.user._id,
      deviceType: req.useragent.isMobile ? "mobile" : "desktop",
      browser: req.useragent.browser,
      expiresAt,
    });

    await newToken.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.json({ accessToken });
  },


  /**
   * Función de cierre de sesión
   * @param {Object} req - Objeto de petición, debe contener el token de actualización en las cookies
   * @param {Object} res - Objeto de respuesta
   * @returns {Object} - Devuelve un objeto JSON con un mensaje de éxito
   */
  logout: async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) return res.status(401).send({ message: i18n.__('auth.invalid_token') });

    const token = await Token.findOne({ token: refreshToken });

    if (!token) return res.status(401).send({  message: i18n.__('auth.invalid_token')});

    token.revoked = true;
    await token.save();

    res.clearCookie("refreshToken");

    return res.send({message: i18n.__('auth.logout')});
  },

  /**
   * Función para actualizar el token de autenticación
   * @param {JSON} req - JSON con el refreshToken en la cookie
   * @returns {Object} - Un objeto con el nuevo token de acceso
   */
  refreshToken: async (req, res) => {
    // Obtener el refreshToken de la cookie
    const { refreshToken } = req.cookies;
  
    // Si no se encuentra el refreshToken, devolver un error 401
    if (!refreshToken) return res.status(401).send({ message: i18n.__('auth.invalid_token')});
  
    // Buscar el token en la base de datos
    const token = await Token.findOne({ token: refreshToken, revoked: false });
  
    // Si el token no es válido, devolver un error 401
    if (!token) return res.status(401).send({ message: i18n.__('auth.invalid_token') });
  
    // Crear un nuevo token de acceso
    const { accessToken } = await signToken(token.user);
  
    // Actualizar el token en la base de datos
    token.token = refreshToken;
    token.createdAt = Date.now();
    token.deviceType = req.useragent.isMobile ? "mobile" : "desktop";
    token.browser = req.useragent.browser;
    await token.save();
  
    // Actualizar el token en la cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  
    return res.json({ accessToken });
  },




}


module.exports = authController;