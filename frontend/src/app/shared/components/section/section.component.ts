import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'page-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @Input() title!: string;
  @Input() divider: boolean = false;
  @Input() icon?: string;
  @Input() showArrow?: boolean = false;

  id:any;
  
  constructor() { }  

  ngOnInit(): void {
    this.id = this.title.toLowerCase().split(" ").join('-');

  }

}
