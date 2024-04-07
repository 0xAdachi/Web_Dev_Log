"use strict";

let message = "ACCCBB";

class CharFreq {
  constructor(char, count) {
    this.char = char;
    this.count = count;
  }
}

class HuffmanCode {
  constructor(char, code) {
    this.char = char;
    this.code = code;
  }
}

class HuffmanNode {
  constructor(char, count) {
    this.char = char;
    this.count = count;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class HuffmanEncoding {
  constructor(str) {
    this.str = str;
  }

  get createFreqMap() {
    let freqMap = [];
    for (let char of this.str) {
      let isFound = false;
      for (let i = 0; i < freqMap.length; i++) {
        if (freqMap[i].char === char) {
          freqMap[i].count++;
          isFound = true;
        }
      }
      if (!isFound) freqMap.push(new CharFreq(char, 1));
    }
    freqMap.sort((a, b) => a.count - b.count);
    return freqMap;
  }

  buildHuffmanTree(freqMap = this.createFreqMap) {
    let priorityQueue = [];
    freqMap.forEach(curr => priorityQueue.push(new HuffmanNode(curr.char, curr.count)));
    
    while(priorityQueue.length > 1) {
      const leftNode = priorityQueue.shift();
      const rightNode = priorityQueue.shift();
      const parentNode = new HuffmanNode("*", leftNode.count + rightNode.count);
      parentNode.leftNode = leftNode;
      parentNode.rightNode = rightNode;
      priorityQueue.push(parentNode);
      priorityQueue.sort((a, b) => a.count - b.count);
    }

    return priorityQueue[0];
  }

  generateHuffmanCodes(node, code = "", codes = []) {
    if (node) {
      if(!node.leftNode && !node.rightNode) {
        codes.push(new HuffmanCode(node.char, code));
      } else {
        this.generateHuffmanCodes(node.leftNode, code + "0", codes);
        this.generateHuffmanCodes(node.rightNode, code + "1", codes);
      }
    }

    return codes;
  }

  encode() {
    let freqMap = this.createFreqMap;
    let huffmanTree = this.buildHuffmanTree(freqMap);
    let huffmanCodes = this.generateHuffmanCodes(huffmanTree);
    let encodedText = "";

    for (let char of this.str) {
      encodedText += huffmanCodes.filter(curr => curr.char === char).map(curr => curr.code).toString();
    }

    return encodedText;
  }

  static decode(encodedText, rootNode) {
    let decodedText = "";
    let currentNode = rootNode;
  
    for (let bit of encodedText) {
      if (bit === "0") currentNode = currentNode.leftNode;
      if (bit === "1") currentNode = currentNode.rightNode;
      if (!currentNode.leftNode && !currentNode.rightNode) {
        decodedText += currentNode.char;
        currentNode = rootNode;
      }
    }

    return decodedText;
  }
}

let hm = new HuffmanEncoding(message);
let encodedText = hm.encode()
let rootNode = hm.buildHuffmanTree();

console.log(HuffmanEncoding.decode(encodedText, rootNode));