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
    if (!user) {
      const error = new Error(i18n.__("auth.access_denied"));
      error.status = 401;
      return done(error, false);
    }
    return done(null, user);
  } catch (error) {
    error.message = i18n.__("errors.generic");
    error.status = 500;
    return done(error, false);
  }
});

// Strategy para autenticación con username y contraseña
const localLogin = new LocalStrategy(
  {
    usernameField: "username",
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({ username }).select('+password');
      if (!user) {
        const error = new Error(i18n.__("auth.user_or_password_not_valid"));
        error.status = 401;
        return done(error, false);
      }

      const isMatch = await Encryption.compare(password, user.password);
      if (!isMatch) {
        const error = new Error(i18n.__("auth.user_or_password_not_valid"));
        error.status = 401;
        return done(error, false);
      }

      return done(null, user);
    } catch (error) {
      error.message = i18n.__("errors.generic");
      error.status = 500;
      return done(error, false);
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
      expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
    });

    return {
      accessToken,
      refreshToken
    };
  } catch (err) {
    throw new Error(err);
  }
};

const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      const error = new Error(i18n.__("auth.invalid_token"));
      error.status = info.status || 401;
      return next(error);
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = {
  initialize: passport.initialize(),
  authenticateJwt: authenticateJwt,
  authenticateLocal: passport.authenticate("local", { session: false }),
  signToken
};
