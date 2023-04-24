import { Component, OnInit, Input } from '@angular/core';
import hljs from 'highlight.js';


@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {
  @Input() code!: string;
  highlightedCode!: string;

  router_test = 'https://raw.githubusercontent.com/hnslopez/sistema-gestion-tareas/main/frontend/src/main.ts'

  constructor() { 
  }

  ngOnInit(): void {
    const highlightedCode = hljs.highlightAuto(this.code).value;
    this.highlightedCode = highlightedCode;
  }

}
