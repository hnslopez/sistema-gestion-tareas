import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuSection } from 'src/app/core/models/menu-section.model';
import { menuItems } from '../../data/menu-items.data';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  menuItems: MenuSection[] = [];
  currentPath!: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateMenu();
        this.currentPath = event.url;
      }
    });
  }

  private updateMenu() {
    const urlSegments = this.router.url.split('/');
    const sectionName = urlSegments[1];
    const itemName = urlSegments[2];

    this.menuItems = menuItems.map((section) => {
      return {
        ...section,
        isOpen: section.name.toLowerCase() === sectionName,
        children: section.children.map((children) => {
          return {
            ...children,
            isActive: children.name.toLowerCase() === itemName,
          };
        }),
      };
    });
  }
}
