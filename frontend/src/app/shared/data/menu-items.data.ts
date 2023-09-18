import { MenuItem } from "src/app/core/models/menu-item.model";
import { MenuSection } from "src/app/core/models/menu-section.model";
/**
 * Define las secciones y elementos del menú.
 */
export const menuItems:MenuItem[] = [
    {
      icon: 'fab fa-angular',
      name: 'Angular',
      route: 'angular',
      tooltip: 'Angular'
    },
    {
      icon: 'fas fa-database',
      name: 'MongoDB',
      route: 'mongodb',
      tooltip: 'MongoDB'
    },
    {
      icon: 'fab fa-node-js',
      name: 'Express',
      route: 'express',
      tooltip: 'Express'
    },
  ];
  
export const submenuItems: MenuSection[] = [
    {
      title: 'Tareas',
      icon: 'bi bi-list-task',
      name: 'Tareas',
      children: [
        {
          title: 'Acciones',
          children: [
            {
              icon: 'fa-solid fa-thumbtack',
              name: 'Ver todas las tareas',
              routerLink:['task']
            },
            {
              icon: 'bi bi-plus-circle',
              name: 'Agregar tarea'
            },
            {
              icon: 'bi bi-star',
              name: 'Ver favoritas'
            },
            {
              icon: 'bi bi-clock',
              name: 'Ver programadas'
            }
          ]
        },
        {
          title: 'Filtrar',
          children: [
            {
              icon: 'fas fa-calendar-day',
              name: 'Hoy'
            },
            {
              icon: 'fas fa-check-circle',
              name: 'Completas'
            },
            {
              icon: 'fas fa-exclamation-circle',
              name: 'Vencidas'
            },
            {
              icon: 'fas fa-folder',
              name: 'Categorias'
            },
            {
              icon: 'fas fa-hourglass-half',
              name: 'Proxima'
            }
          ]
        }
      ]
    },
    {
      title: 'Proyectos',
      icon: 'bi bi-journal',
      name: 'Proyectos',
      children: [
        {
          title: 'Acciones',
          children: [
            {
              icon: 'bi bi-folder-plus',
              name: 'Nuevo Proyecto',
              routerLink:['projects','create']

            },
            {
              icon: 'bi bi-folder2-open',
              name: 'Ver Proyectos',
              routerLink:['projects']
            }
          ]
        },
        {
          title: 'Filtrar',
          children: [
            {
              icon: 'fas fa-check-circle', 
              name: 'Completados',
              routerLink: ['projects', 'completed']
            },
            {
              icon: 'fas fa-exclamation-circle',
              name: 'Pendientes',
              routerLink: ['projects', 'pending']
            },
            {
              icon: 'bi bi-archive', 
              name: 'Archivados',
              routerLink: ['projects', 'archived']
            },
            {
              icon: 'bi bi-x-circle',
              name: 'Cancelados',
              routerLink: ['projects', 'cancelled']
            },
          ]
          
        },
        /*
        {
          title: 'Avanzado',
          children: [
            {
              icon: 'bi bi-people',
              name: 'Compartir Proyecto'
            },
            {
              icon: 'bi bi-chat-right-text',
              name: 'Comentarios'
            }
          ]
        }
        */
      ]
    },
    {
      title: 'Usuarios',
      icon: 'bi bi-person',
      name: 'Usuarios',
      children: [
        {
          title: 'Ver usuarios',
          children: [
            {
              icon: 'fas fa-users',
              name: 'Ver todos los usuarios'
            },
            {
              icon: 'fas fa-user-check',
              name: 'Usuarios verificados'
            },
            {
              icon: 'fas fa-user-slash',
              name: 'Usuarios bloqueados'
            }
          ]
        },
        {
          title: 'Agregar usuario',
          children: [
            {
              icon: 'bi bi-plus-circle',
              name: 'Agregar usuario'
            },
            {
              icon: 'fas fa-user-tag',
              name: 'Agregar etiqueta'
            }
          ]
        },
        {
          title: 'Filtrar usuarios',
          children: [
            {
              icon: 'fas fa-calendar-day',
              name: 'Registrados hoy'
            },
            {
              icon: 'fas fa-user-tag',
              name: 'Usuarios con etiquetas'
            }
          ]
        }
      ]
    },
    {
      title: 'Roles y Permisos',
      icon: 'bi bi-shield-lock',
      name: 'Roles y Permisos',
      children: [
        {
          title: 'Acciones',
          children: [
            {
              icon: 'fas fa-list',
              name: 'Ver todos los roles'
            },
            {
              icon: 'fas fa-plus',
              name: 'Agregar nuevo rol'
            }
          ]
        },
        {
          title: 'Permisos',
          children: [
            {
              icon: 'fas fa-list',
              name: 'Ver todos los permisos'
            },
            {
              icon: 'fas fa-plus',
              name: 'Agregar nuevo permiso'
            }
          ]
        },
        {
          title: 'Asignación',
          children: [
            {
              icon: 'fas fa-user-plus',
              name: 'Asignar rol a usuario'
            },
            {
              icon: 'fas fa-key',
              name: 'Asignar permiso a rol'
            }
          ]
        }
      ]
    }
  ];
  