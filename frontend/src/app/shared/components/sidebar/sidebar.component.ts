import { Component, EventEmitter, Input, OnInit , Output, DoCheck, OnChanges, SimpleChanges, ElementRef, Renderer2} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuSection } from 'src/app/core/models/menu-section.model';
import { ThemeService } from 'src/app/theme.service';
import { menuItems, submenuItems } from '../../data/menu-items.data';
import { ThemeType } from '../../enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})



export class SidebarComponent implements OnInit, OnChanges {
  @Input() isCollapsed = false;
  @Input() isMobile = false;
  @Output() isCollapsedChanged = new EventEmitter<boolean>();
  menuItems = menuItems;
  submenuItems = submenuItems;
  currentPath!: string;
  public ThemeType = ThemeType; 
  nzSelected= false;
  mode = false;

  public themeChanged$!: BehaviorSubject<ThemeType>;


  constructor(private router: Router, private themeService: ThemeService, private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isMobile']) {
      const divGenerado = this.el.nativeElement.querySelector('.ant-affix');
      if (divGenerado) {
        this.renderer.addClass(divGenerado, 'collapsed-affix');
      }
    }
  }

  ngOnInit(): void {
    this.themeChanged$ = this.themeService.getThemeChanged();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  close(): void {
    this.isCollapsed = this.isCollapsed;
    this.isCollapsedChanged.emit(!this.isCollapsed);
  }
}
