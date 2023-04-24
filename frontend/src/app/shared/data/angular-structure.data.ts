import { treeNode } from "../interface";

export const angularStructureData: treeNode[] =[
    {
      name: 'Fruit',
      children: [{ name: 'Apple' }, { name: 'Banana', disabled: true }, { name: 'Fruit loops' }]
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }, { name: 'Pumpkins' }, { name: 'Carrots' }, { name: 'Pumpkins' }, { name: 'Carrots' },{ name: 'Pumpkins' }, { name: 'Carrots' }
        ,{ name: 'Pumpkins' }, { name: 'Carrots' },{ name: 'Pumpkins' }, { name: 'Carrots' },{ name: 'Pumpkins' }, { name: 'Carrots' },{ name: 'Pumpkins' }, { name: 'Carrots' },{ name: 'Pumpkins' }, { name: 'Carrots' }]
        }
      ]
    }
];