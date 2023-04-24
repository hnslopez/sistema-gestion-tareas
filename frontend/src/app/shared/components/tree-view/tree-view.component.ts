import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Input } from '@angular/core';
import { treeFlatNode, treeNode } from '../../interface'

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements AfterViewInit {
  @Input() TREE_DATA!: treeNode[];


  private transformer = (node: treeNode, level: number): treeFlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
    disabled: !!node.disabled
  });
  selectListSelection = new SelectionModel<treeFlatNode>();

  treeControl = new FlatTreeControl<treeFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  ngOnInit() {
    this.dataSource.setData(this.TREE_DATA);
  }

  hasChild = (_: number, node: treeFlatNode): boolean => node.expandable;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.treeControl.expand(this.getNode('Vegetables')!);
    }, 300);
  }

  getNode(name: string): treeFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
