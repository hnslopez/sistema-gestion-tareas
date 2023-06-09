import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-title',
  templateUrl: './main-title.component.html',
  styleUrls: ['./main-title.component.css']
})
export class MainTitleComponent implements OnInit {
  @Input() dividerTop: boolean = false;
  @Input() dividerBottom: boolean = false;
  @Input() padding?: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
