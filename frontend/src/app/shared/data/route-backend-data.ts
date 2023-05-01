export const routes = [
    { method: 'GET', path: '/*', description: 'Ruta de frontend' },
    { method: 'GET', path: '/set-cookie', description: 'Ruta para testing de cookie de idioma' },
    { method: 'GET', path: '/api/task/', description: 'Obtener todas las tareas' },
    { method: 'GET', path: '/api/task/:id', description: 'Obtener una tarea específica por su ID' },
    { method: 'POST', path: '/api/task/', description: 'Crear una nueva tarea' },
    { method: 'PATCH', path: '/api/task/:id', description: 'Actualizar una tarea existente' },
    { method: 'DELETE', path: '/api/task/:id', description: 'Eliminar una tarea existente' },
    { method: 'GET', path: '/api/user/', description: 'Obtener todos los usuarios' },
    { method: 'POST', path: '/api/user/register', description: 'Registrar un nuevo usuario' },
    { method: 'PATCH', path: '/api/user/:id', description: 'Actualizar un usuario existente' },
    { method: 'DELETE', path: '/api/user/:id', description: 'Eliminar un usuario existente' },
    { method: 'POST', path: '/api/user/forgot-password', description: 'Enviar correo electrónico para restablecer contraseña' },
    { method: 'PUT', path: '/api/user/change-password', description: 'Cambiar la contraseña de un usuario' },
    { method: 'POST', path: '/api/auth/login', description: 'Iniciar sesión' },
    { method: 'POST', path: '/api/auth/refresh', description: 'Refrescar token de autenticación' },
    { method: 'POST', path: '/api/auth/logout', description: 'Cerrar sesión' }
];
