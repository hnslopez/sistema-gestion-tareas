import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  isMobile = false;
  isCollapsedNotification = false;


  @Input() isCollapsed: boolean = false;
  @Output() toggleCollapsed = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  toggleMobile(): void {
    this.isMobile = !this.isMobile;
  }

  onToggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleCollapsed.emit(this.isCollapsed);
  }

  onDropdownVisibleChange(visible: boolean) {
    if (visible) {
      this.isCollapsedNotification = true; // cambiar a tema fill
    } else {
      this.isCollapsedNotification = false; // cambiar a tema outline
    }
  }
}
