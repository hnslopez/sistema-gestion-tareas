import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Input, Output, EventEmitter} from '@angular/core';
import { treeFlatNode, treeNode } from '../../interface'

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { ApiService } from 'src/app/core/services';
import axios from 'axios';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements AfterViewInit {
  @Input() TREE_DATA!: treeNode[];
  @Output() codeData = new EventEmitter<any>();


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

  constructor(private http: ApiService) {
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

  async getData(value:any){
    let route = (value.path === '.'? 'frontend': 'frontend/'+ value.path)
    let response = await axios.get('https://raw.githubusercontent.com/hnslopez/sistema-gestion-tareas/production/'+ route + '/' + value.name);
    console.log(JSON.stringify(response.data, null, 2))
    this.codeData.emit(response.data);
  
  }

  private getPath(node:treeNode,finder:any){
    let name = '';



  }

  getNode(name: string): treeFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
