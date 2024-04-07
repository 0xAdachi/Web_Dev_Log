"use strict";

/*
export class Node {
  constructor(value, maxDepth, depth = 0) {
    this.value = value;
    this.maxDepth = maxDepth;
    this.depth = depth;
    this.nodeLeft = null;
    this.nodeRight = null;
    
    if (this.depth < this.maxDepth) {
      this.nodeLeft = new Node(2 * this.value, this.maxDepth, depth + 1);
      this.nodeRight = new Node((2 * this.value) + 1, this.maxDepth, depth + 1);
    }
  }

  logTree() {
    console.log(`Value: ${this.value}, Depth: ${this.depth}`);
    if (this.nodeLeft) this.nodeLeft.logTree();
    if (this.nodeRight) this.nodeRight.logTree();
  }
}

*/

class Node {
  constructor(value) {
    this.value = value;
    this.nodeLeft = null;
    this.nodeRight = null;
  }
}

class BinaryTree {
  constructor(root, maxDepth) {
    this.root = root || null;
    this.maxDepth = maxDepth || 0;

    this.constructBinaryTree(this.root);
  }
  
  constructBinaryTree(node, depth = 0) {
    if (depth >= this.maxDepth) return;

    node.nodeLeft = new Node(2 * node.value);
    this.constructBinaryTree(node.nodeLeft, depth + 1)
    node.nodeRight = new Node((2 * node.value) + 1);
    this.constructBinaryTree(node.nodeRight, depth + 1)
  }

  printTree(node = this.root, path = "" || "0") {
    if (node != null) {
      console.log(node.value, "(" + path + ")");
      this.printTree(node.nodeLeft, path + "0")
      this.printTree(node.nodeRight, path + "1");
    }
  }

  printAsTree(node = this.root, prefix = "", isLeftChild = false) {
    if (node == null) return;
    console.log(prefix + (isLeftChild ? "├─" : "└─") + node.value);
    const newPrefix = prefix + (isLeftChild ? "│ " : "  ");
    if (node.nodeLeft || node.nodeRight) {
      this.printAsTree(node.nodeRight, newPrefix, true);
      this.printAsTree(node.nodeLeft, newPrefix, false);
    }
  }
}

let rootNode = new Node(1);
let binTree = new BinaryTree(rootNode, 2);

console.log(binTree);
binTree.printTree();
binTree.printAsTree();