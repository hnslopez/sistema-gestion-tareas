```
fontend/
├── core/
|   ├── auth/
|   |   ├── auth.interceptor.ts # Interceptor para manejar la autenticación
|   |   ├── auth.guard.ts # Guard para proteger rutas que requieren autenticación
|   |   └── auth.service.ts # Servicio para manejar la autenticación
|   ├── http/
|   |   └── http.interceptor.ts # Interceptor para manejar las peticiones HTTP
|   ├── models/
|   |   └── task.model.ts # Modelo de tarea
|   ├── services/
|   |   ├── api.service.ts # Servicio para realizar peticiones HTTP al backend
|   |   ├── config.service.ts # Servicio para manejar la configuración de la aplicación
|   |   └── index.ts # Archivo principal para exportación de servicios
|   ├── store/
|   |   ├── actions/
|   |   |   ├── tasks.actions.ts # Acciones para manejar tareas
|   |   |   └── auth.actions.ts # Acciones para manejar la autenticación
|   |   ├── reducers/
|   |   |   ├── tasks.reducer.ts # Reductor para manejar tareas
|   |   |   └── auth.reducer.ts # Reductor para manejar la autenticación
|   |   └── effects/
|   |       ├── tasks.effects.ts # Efectos para manejar tareas
|   |       └── auth.effects.ts # Efectos para manejar la autenticación
|   └── utils/
|       ├── date.utils.ts # Utilidades para manejar fechas
|       └── index.ts # Archivo principal para exportación de utilidades
├── shared/
|   └── components/
|       └── task-form/
|           ├── task-form.component.ts # Componente para mostrar el formulario de tarea
|           ├── task-form.component.html # Plantilla del componente para mostrar el formulario de tarea
|           └── task-form.component.scss # Estilos del componente para mostrar el formulario de tarea
|       └── navbar/
|           ├── navbar.component.ts # Componente para mostrar el formulario de tarea
|           ├── navbar.component.html # Plantilla del componente para mostrar el formulario de tarea
|           └── navbar.component.scss # Estilos del componente para mostrar el formulario de tarea

└── features/
    ├── tasks/
    |   ├── components/
    |   |   └── task-list/
    |   |       ├── task-list.component.ts # Componente para mostrar la lista de tareas
    |   |       ├── task-list.component.html # Plantilla del componente para mostrar la lista de tareas
    |   |       └── task-list.component.scss # Estilos del componente para mostrar la lista de tareas
    |   └── services/
    |       └── task.service.ts # Servicio para manejar tareas
    └── auth/
        ├── components/
        |   ├── login/
        |   |   ├── login.component.ts # Componente para mostrar el formulario de inicio de sesión
        |   |   ├── login.component.html # Plantilla del componente para mostrar el formulario de inicio de sesión
        |   |   └── login.component.scss # Estilos del componente para mostrar el formulario de inicio de sesión
        |   └── register/
        |       ├── register.component.ts # Componente para mostrar el formulario de registro
        |       ├── register.component.html # Plantilla del componente para mostrar el formulario de registro
        |       └── register.component.scss # Estilos del componente para mostrar el formulario de registro
        └── services/
            ├── auth.service.ts # Servicio para manejar la autenticación
            └── index.ts # Archivo principal para exportación

│   │   │   ├── reset-password/
│   │   │   │   ├── reset-password.component.ts
│   │   │   │   ├── reset-password.component.html
│   │   │   │   ├── reset-password.component.scss
│   │   ├── services/
│   │   │   ├── auth.service.ts
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.module.ts
├── app.routing.ts
├── app.config.ts

```
