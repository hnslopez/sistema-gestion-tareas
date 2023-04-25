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


  ngOnInit(): void {
    this.highlightCode();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['code']) {
      this.highlightCode();
    }
  }

  private highlightCode() {
    const highlightedCode = hljs.highlightAuto(this.code).value;
    this.highlightedCode = highlightedCode;
  }

}
