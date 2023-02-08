/**
 * authentication.js - Middleware de autenticación en Express
 * Este archivo contiene el middleware de autenticación para proteger las rutas y asegurarse de que solo un usuario autenticado pueda acceder a ellas.
 * Utiliza la libreria "passport-local" para la autenticación.
 * También incluye funciones para actualizar el token de inicio de sesión y el token de actualización.
 */


const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const refresh = require("passport-jwt-refresh");
