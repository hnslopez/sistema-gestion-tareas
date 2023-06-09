import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  @Input() contentText: string = 'project.no_projects';

  constructor() { }

  ngOnInit(): void {
  }

}
