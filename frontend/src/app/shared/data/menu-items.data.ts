import { MenuSection } from "src/app/core/models/menu-section.model";
/**
 * Define las secciones y elementos del menú.
 */
export const menuItems: MenuSection[] = [

    {
      name: 'Tareas',
      icon: 'check-square',
      children: [
        {
          name: 'Crear Tarea',
          route: '/tareas/crear',
        },
        {
          name: 'Todas las Tareas',
          route: '/tareas/todas',
        },
        {
          name: 'Tareas Completadas',
          route: '/tareas/completadas',
        },
        {
          name: 'Tareas Eliminadas',
          route: '/tareas/eliminadas',
        },
        {
          name: 'Subtarea 1',
          route: '/tareas/todas/subtarea1',
        },
        {
          name: 'Subtarea 2',
          route: '/tareas/todas/subtarea2',
        },
        {
          name: 'Subtarea 3',
          route: '/tareas/todas/subtarea3',
        },
      ],
    },
    {
      name: 'Administración',
      icon: 'user',
      children: [
        {
          name: 'Lista de Usuarios',
          route: '/admin/lista-usuarios',
        },
        {
          name: 'Registrar Usuario Manualmente',
          route: '/admin/registrar-usuario',
        },
        {
          name: 'Roles',
          route: '/admin/roles',
        },
        {
          name: 'Dashboard',
          route: '/admin/dashboard',
        },
      ],
    },
  ];
  