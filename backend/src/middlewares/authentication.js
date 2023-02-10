const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Encryption } = require("../common/helper");
const i18n = require("../utils/i18n");

const User = mongoose.model("User");
 
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET
};

// Strategy para autenticación con JWT
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
      const user = await User.findById(payload.sub);
      if (!user) return done(null, false, { message: i18n.__("errors.access_denied") });
      return done(null, user);
  } catch (error) {
      return done(error, false, { message: i18n.__("errors.generic_error") });
  }
});

// Strategy para autenticación con username y contraseña
const localLogin = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
      try {
          const user = await User.findOne({ username }).select('+password');;
          if (!user) return done(null, false, { message: i18n.__("errors.user_or_password_not_valid") });
          const isMatch = await Encryption.compare(password, user.password);
          if (!isMatch) return done(null, false, { message: i18n.__("errors.user_or_password_not_valid") });
          return done(null, user);
      } catch (error) {
          return done(error, false, { message: i18n.__("errors.generic_error") });
      }
  }
);
// Función para serializar un usuario
const serializeUser = (user, done) => {
  done(null, user._id);
};

// Función para deserializar un usuario
const deserializeUser = (id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
};



// Usar las estrategias definidas
passport.use(jwtLogin);
passport.use(localLogin);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Función para firmar un token de JWT
const signToken = async (userId) => {
    try {
      // Creación del token de acceso
      const accessToken = await jwt.sign({
        sub: userId,
      }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
      });
    
      // Creación del token de refresco
      const refreshToken = await jwt.sign({
        sub: userId,
      }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN__TIME,
      });
    
      return {
        accessToken,
        refreshToken
      };
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
    initialize: passport.initialize(),
    authenticateJwt: passport.authenticate("jwt", { session: false }),
    authenticateLocal: passport.authenticate("local", { session: false }),
    signToken
};
