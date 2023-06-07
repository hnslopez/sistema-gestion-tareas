import { MenuItem } from "./menu-item.model";

/**
 * Define la estructura de los elementos del menú.
 * @param name - Nombre de la sección.
 * @param route - Ruta a la que apunta la sección.
 * @param icon - Icono que se muestra junto a la sección.
 * @param children - Hijos de la sección.
 */
export interface MenuSection {
  title: string;
  icon?: string;
  name?: string;
  children?: submenuSection[];
}


interface submenuSection {
  title?:string;
  name?:string;
  icon?:string;
  routerLink?:string[];
  children?: submenuSection[];
}

