# Sistema de Gestión de Tareas [WIP]
Este proyecto es una aplicación web para la gestión de tareas, construida con las siguientes tecnologías:

Express como el framework de Node.js para crear el servidor y las API.
Mongoose para conectarse y modelar los datos en MongoDB.
Angular como el framework frontend para crear una interfaz atractiva y fácil de usar.

# Funcionalidades
- Creación y asignación de tareas a diferentes proyectos
- Asignación de fechas límite y prioridades a las tareas
- Integración con calendario
- Notificaciones por correo electrónico
- Seguimiento de la progresión de las tareas
- Generación de informes de progreso
- Interfaz de usuario atractiva y fácil de usar utilizando tecnologías como HTML, CSS, Angular, Bootstrap, etc.

# Arquitectura
El proyecto está dividido en dos partes principales: el servidor y el cliente.
```

.
src
└── common
|   ├── enums
|   |   └── task.js # Enum de tareas
|   |   └── index.js # Archivo principal para exportación
|   └── helpers
|       └── encryption.js # Helpers para encriptación
|       └── index.js # Archivo principal para exportación
├── controllers
|   ├── index.js # Archivo principal para exportación
|   ├── task.js # Controlador de tareas
|   └── user.js # Controlador de usuarios
├── middlewares
|   └── authentication.js # Middleware de autenticación
├── models
|   ├── index.js # Archivo principal para exportación
|   ├── task.js # Modelo para tareas
|   └── user.js # Modelo para usuarios
├── routes
|   └── index.js # Archivo principal para exportación de rutas
|   ├── main.js # Rutas generales
|   ├── task.js # Rutas de tareas
|   ├── user.js # Rutas de usuarios
|   └── auth.js # Rutas de autenticación
├── utils
|   ├── locales
|   |   ├── en.json # Archivo de idioma Inglés
|   |   └── es.json # Archivo de idioma Español
|   └── jwt.js # Utilidades para el manejo de JWT
|   └── i18n.js # Utilidades para el manejo del sistema de i18n
└──__tests__
    ├── controllers
    |   ├── task.test.js
    |   └── user.test.js
    ├── middlewares
    |   └── authentication.test.js
    ├── models
    |   ├── task.test.js
    |   └── user.test.js
    ├── routes
    |   ├── auth.test.js
    |   ├── main.test.js
    |   ├── task.test.js
    |   └── user.test.js
    └── utils
        ├── jwt.test.js
        └── i18n.test.js

```

# Servidor
El servidor es una aplicación construida con Express que maneja las solicitudes HTTP y se comunica con MongoDB a través de Mongoose. También valida y manipula los datos antes de enviarlos o recibirlos.

# Cliente
El cliente es una aplicación construida con Angular que proporciona una interfaz gráfica de usuario para que puedas interactuar con el sistema de gestión de tareas. Se comunica con el servidor a través de API RESTful.

# Instrucciones de instalación [WIP]
- Clona este repositorio en tu equipo.
- Instala las dependencias con npm install.
- Inicia el servidor con npm run start:server.
- Inicia el cliente con npm run start:client.
- Accede a http://localhost:3000 en tu navegador para ver la aplicación en funcionamiento.

Notas
Este proyecto es solo una muestra y puede tener incongruencias y falta de documentación. Se recomienda leer el código y agregar comentarios para entender y personalizar el proyecto de acuerdo a tus necesidades.
