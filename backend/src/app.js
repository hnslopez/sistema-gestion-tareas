require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const routes = require('./routes');
const i18n = require('./utils/i18n');
const { initialize } = require('./middlewares/authentication');
const cookieParser = require('cookie-parser');
const { errorHandling, rateLimiterMiddleware, routeErrorHandler } = require('./middlewares');
const path = require('path');

// Conecta la base de datos
require('./database'); 

// Us Configuración basica de cors
app.use(cors());

app.use(express.static(path.join(__dirname, '../dist/frontend')));

// Configuración de i18n
app.use(i18n.init);

// Use morgan for request logging
app.use(morgan("dev"));

// inicialización de passport
app.use(initialize);

// inicialización de cookieParse
app.use(cookieParser());


// Configuración de Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de rutas
app.use(routes.mainRoutes);
app.use('/api/task',routes.taskRoutes);
app.use('/api/user',routes.userRoutes);
app.use('/api/auth',routes.authRoutes);

// Middlewares
app.use(rateLimiterMiddleware);
app.use(routeErrorHandler);
app.use(errorHandling); 

// Inicie el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Extraer todas las rutas
function extractRoutes(app) {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const fullPath = middleware.route.path;
      const methods = Object.keys(middleware.route.methods);
      methods.forEach((method) => {
        routes.push({
          method,
          path: fullPath
        });
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {

          const fullPath = middleware.regexp.toString().replace(/^\/|\/[?].*|\/[i]$/g, '').replace(/\\/g, '').replace(/^^/g, '')  + handler.route.path;

          const methods = Object.keys(handler.route.methods);
          methods.forEach((method) => {
            routes.push({
              method,
              path: fullPath
            });
          });
        }
      });
    }
  });

  return routes;
}

const allRoutes = extractRoutes(app);
console.log(allRoutes)