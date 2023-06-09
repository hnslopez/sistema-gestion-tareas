export const generateJWT = `const signToken = async (userId) => {
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
  };`

  export const validationPassportJWT = `const authenticateJwt = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        const error = new Error(i18n.__("auth.invalid_token"));
        error.status = info.status || 401;
        return next(error);
      }
  
      req.user = user;
      return next();
    })(req, res, next);
  };`;

  export const validationPassportLocal = `new LocalStrategy(
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
  `
  export const loginCode = `async (req, res) => {
    const { accessToken, refreshToken } = await signToken(req.user._id);
    const expiresIn = ms(process.env.JWT_ACCESS_TOKEN_TIME || '15m');
    const expiresAt = new Date(Date.now() + expiresIn);

    const newToken = new Token({
      token: refreshToken,
      user: req.user._id,
      expiresAt,
    });

    await newToken.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    return res.json({ accessToken });
  },  `