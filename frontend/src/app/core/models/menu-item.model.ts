/**
 * Define la estructura de los ítems del menú.
 * @param name - Nombre del ítem.
 * @param route - Ruta asociada al ítem.
*/

export interface MenuItem {
  icon: string;
  name: string;
  route: string;
  tooltip: string;
}

