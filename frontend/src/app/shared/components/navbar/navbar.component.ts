import { Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges {

  constructor() { }

  @Input() isMobile!:boolean;
  isCollapsedNotification = false;
  visibleDrawer = false;
  visibleDropdown = false;
  placement: NzDrawerPlacement = 'bottom';

  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];

  @Input() isCollapsed: boolean = false;
  @Output() toggleCollapsed = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isMobile']){
      console.log(changes['isMobile'].currentValue, this.isCollapsedNotification)
      if(changes['isMobile'].currentValue && this.isCollapsedNotification)return this.openDrawer();
      if(changes['isMobile'].currentValue && !this.isCollapsedNotification)return this.closeDrawer();
      if(!changes['isMobile'].currentValue && this.isCollapsedNotification)return this.openDropdown();
  
    }


  }


  openDropdown(): void {
      this.visibleDropdown = true;
      this.visibleDrawer = false;
      this.isCollapsedNotification = true; 

  }
  
  
  onToggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleCollapsed.emit(this.isCollapsed);
  }


  openDrawer(): void {
    this.visibleDrawer = true;
    this.isCollapsedNotification = true; 
    this.visibleDropdown = false;

  }

  closeDrawer(): void {
    this.visibleDrawer = false;
    this.isCollapsedNotification = false; 
  }


  onDropdownVisibleChange(visible: boolean) {
    if (visible) {
      this.isCollapsedNotification = true; 
    } else {
      this.isCollapsedNotification = false; 
    }
  }
}
