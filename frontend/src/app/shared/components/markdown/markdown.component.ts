import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import hljs from 'highlight.js';


@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {
  @Input() code!: string;
  highlightedCode!: string;
  isInSelection?:boolean = false;


  ngOnInit(): void {
    this.highlightCode();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['code']) {
      this.highlightCode();
    }
    if (changes['isInSelection']) {
      this.isInSelection = true;
    }
    

  }

  private highlightCode() {
    try {
      this.highlightedCode = hljs.highlightAuto(this.code).value;
      this.isInSelection = false
    } catch (e) { 
      this.isInSelection = true;
    }

  }

}
