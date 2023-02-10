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


const authController = {

    login: async (req, res) => {
        const { accessToken, refreshToken } = await signToken(req.user._id);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });
        return res.json({ accessToken });
    },

    async logout(req, res) {
        try {
          const { userId } = req;
          const user = await User.findById(userId);
          if (!user) {
            return res.send({ message: "User not found" }); 
          }
    
          user.tokenVersion++;
          await user.save();
    
          res.clearCookie("refreshToken");
          res.send({ message: "Logged out successfully" });
        } catch (err) {
          res.status(500).send({ message: "Error logging out" });
        }
      },

}


module.exports = authController;