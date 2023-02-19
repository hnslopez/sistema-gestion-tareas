const routeErrorHandler = (req, res, next) => {
    const error = new Error('No se encontró la ruta solicitada');
    error.status = 404;
    next(error);
  };

module.exports = routeErrorHandler;
  