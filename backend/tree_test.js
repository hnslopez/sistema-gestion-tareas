"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function getTree(filePath, currentPath = '') {
  const stats = fs.statSync(filePath);
  const nodeName = path.basename(filePath);
  const node = { name: nodeName, path: currentPath };

  if (stats.isDirectory()) {
    node.children = fs.readdirSync(filePath)
      .filter((child) => child !== 'dist' && child !== 'node_modules' && child !== '.angular')
      .map((child) => {
        const childPath = path.join(filePath, child);
        return getTree(childPath, path.join(currentPath, nodeName));
      })
      .filter((child) => child !== null)
      .sort((a, b) => {
        if (a.children && !b.children) {
          return -1;
        } else if (!a.children && b.children) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
  } else {
    const ext = path.extname(filePath);
    if (ext === '.png' || ext === '.ico' || ext === '.env') {
      node.disabled = true;
    }
  }

  return node;
}

  
  
  
  const filePath = './';
  const tree = getTree(filePath);
  fs.writeFileSync('./treeView.json', JSON.stringify(tree));
  