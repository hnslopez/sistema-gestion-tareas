/**
 * encryption.js - Encriptación
 *
 * Este archivo contiene las funciones de encriptación para aplicación de gestión de tareas.
 * Utiliza bcrypt para la encriptación y descriptación.
 *
 * Las operaciones disponibles incluyen:
 *  - Encriptar
 *  - Comparar un texto y un texto encriptado
 */


const bcrypt = require("bcryptjs");

const _saltRounds = 10;

const encryption = {

    /**
     * Encripta texto plano
     * @param {String} str - Texto para encriptar
     * @returns {Promise<string>} Retorna el texto encriptado
     */
    async encrypt(str) {
        return await bcrypt.hash(str, _saltRounds);
    },

  /**
   * Compara texto encriptado y texto ingresado
   * @param {String} str - Texto para comparar
   * @param {String} encrypted - Texto encriptado
   * @returns {Promise<Boolean>} Retorna un boolean, True si el texto encriptado y el ingresado son iguales.
   */
  async compare(str, encrypted) {
    return await bcrypt.compare(str, encrypted);
  },
};

module.exports = encryption;