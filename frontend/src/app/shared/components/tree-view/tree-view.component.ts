import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Input, Output, EventEmitter, SecurityContext} from '@angular/core';
import { treeFlatNode, treeNode } from '../../interface'
import { DomSanitizer } from '@angular/platform-browser';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import axios from 'axios';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements AfterViewInit {
  @Input() TREE_DATA!: treeNode[];
  @Output() codeData = new EventEmitter<any>();
  @Output() onChangeSelect = new EventEmitter<boolean>();


  private transformer = (node: treeNode, level: number): treeFlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    path: node.path,
    disabled: !!node.disabled
  });
  selectListSelection = new SelectionModel<treeFlatNode>();

 
  treeControl = new FlatTreeControl<treeFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor( private sanitizer:DomSanitizer) {

    }

  ngOnInit() {
    this.dataSource.setData(this.TREE_DATA);
  }

  hasChild = (_: number, node: treeFlatNode): boolean => node.expandable;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.treeControl.expand(this.getNode('frontend')!);
    }, 300);
  }

  onChangeSelected(){
    this.onChangeSelect.emit(true);

  }

  async getData(value:any){
    const path = value.path === '.' ? 'frontend' : `frontend/${value.path}`;
    const url = `https://raw.githubusercontent.com/hnslopez/sistema-gestion-tareas/production/${path}/${value.name}`; 
    const satinizeUrl=  this.sanitizer.sanitize(SecurityContext.URL, url);
    console.log(satinizeUrl)

    try {
      const response = await axios.get(satinizeUrl!);
      let data = response.data;
      if (typeof data === 'object') {
        data = JSON.stringify(data, null, 2);
      }
      this.codeData.emit(data);
    } catch (error:any) {
      console.error(`${error.message}`);
    }
    


  
  }

  private getPath(node:treeNode,finder:any){
    let name = '';



  }

  getNode(name: string): treeFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
