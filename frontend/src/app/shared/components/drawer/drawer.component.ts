import { Component, OnInit, Input, HostListener, Renderer2 } from '@angular/core';
import { NzDrawerPlacement, NzDrawerSize } from 'ng-zorro-antd/drawer';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() placement: NzDrawerPlacement = 'right';
  @Input() size: NzDrawerSize = 'default';
  @Input() title!: string;
  isMobile:boolean = false;

  constructor() { }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit(): void {
    this.onResize();

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
