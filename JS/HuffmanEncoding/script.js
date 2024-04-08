"use strict";

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

  // ### Create a frequency map which is basically a list of all characters and how many times they are present in the text ### //
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

  // ### Builds the Huffman Tree from the frequency map ### //
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

  // ### Generate the encode for all characters in text from the huffman tree ### //
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

  // ### Encode the text ### //
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

  // ### Decode the text from a encoded text and a huffman tree ### //
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

// ### HTML element references ### //
const inputMessage = document.getElementById("input-message");
const encodeBtn = document.getElementById("encode-btn");
const encodedMessege = document.getElementById("encoded-text");
const huffmanTree = document.getElementById("huffman-tree");
const inputEncode = document.getElementById("input-encode");
const inputHFTree = document.getElementById("input-hf-tree");
const decodeBtn = document.getElementById("decode-btn");
const decodedMessege = document.getElementById("decoded-text");
const toast = document.getElementById('toast');

// ### Encode on click ### //
encodeBtn.addEventListener("click", () => {
  let message = new HuffmanEncoding(inputMessage.value);
  let hfTree = message.buildHuffmanTree();
  let encodedData = message.encode();
  encodedMessege.textContent = encodedData;
  huffmanTree.textContent = JSON.stringify(hfTree)
});

encodedMessege.addEventListener("click", () => {
  navigator.clipboard.writeText(encodedMessege.textContent);
  showToast();
});

huffmanTree.addEventListener("click", () => {
  navigator.clipboard.writeText(huffmanTree.textContent);
  showToast();
});

// ### Decode on click from the input encode and input huffman tree ### //
decodeBtn.addEventListener("click", () => {
  let encodedText = inputEncode.value;
  let rootNode = JSON.parse(inputHFTree.value);
  let decodedText = HuffmanEncoding.decode(encodedText, rootNode)
  decodedMessege.textContent = decodedText;
});

decodedMessege.addEventListener("click", () => {
  navigator.clipboard.writeText(decodedMessege.textContent);
  showToast();
});

function showToast() {
  toast.classList.remove('hide');
  setTimeout(() => toast.classList.add('hide'), 2000);
}
