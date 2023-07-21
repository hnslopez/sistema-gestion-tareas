import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() inputValue!:string;
  @Input() cleaner?:boolean = false;
  @Input() icon?:string;
  @Input() placeholder?:string='';
  @Input() autoComplete?: NzAutocompleteComponent | null = null;
  @Input() status?:'error' | 'warning';
  @Input() borderless?:boolean = false;
  @Input() type?:string = 'text';

  @Output() inputValueChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(value: string): void {
    this.inputValueChange.emit(value);
  }

  clearSearch(): void {
    this.inputValue = ''; // Limpiar el campo de búsqueda
    this.inputValueChange.emit('');
  }
}
