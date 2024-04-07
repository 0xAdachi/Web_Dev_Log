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

  buildHuffmanTree(freqMap) {
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
}

let hm = new HuffmanEncoding(message);

console.log(hm.encode());