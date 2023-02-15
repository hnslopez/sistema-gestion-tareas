/**
 * 
 * Expresión regular para validar la fortaleza de una contraseña.
 * Debe contener al menos una letra minúscula, una letra mayúscula, un número.
 * Además, debe tener al menos 6 caracteres de longitud.
 * @type {RegExp} 
*/
module.exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
/**
 * 
 * Expresión regular para validar una dirección de correo electrónico.
 * @type {RegExp}
*/
module.exports.emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
/**
 * 
 * Expresión regular para validar un nombre de usuario.
 * El nombre de usuario debe tener al menos 6 caracteres y solo puede contener letras, números, guiones bajos, guiones y puntos.
 * @type {RegExp}
*/
module.exports.usernameRegex = /^[a-zA-Z0-9._-]{6,}$/;