import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'img-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() alt!: string;
  @Input() route?: string;
  @Input() loading?: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
