const routeErrorHandler = (req, res, next) => {
    const error = new Error('No se encontrĂ³ la ruta solicitada');
    error.status = 404;
    next(error);
  };

module.exports = routeErrorHandler;
  