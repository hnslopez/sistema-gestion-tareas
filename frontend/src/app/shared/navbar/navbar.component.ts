import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  @Input() isCollapsed: boolean = false;
  @Output() toggleCollapsed = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  onToggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleCollapsed.emit(this.isCollapsed);
  }
}
