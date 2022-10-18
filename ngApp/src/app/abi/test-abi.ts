export const testABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "val1",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "val2",
          "type": "uint256"
        }
      ],
      "name": "etherEvent",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "list",
      "outputs": [
        {
          "internalType": "string",
          "name": "atrr",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "returnStruct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "atrr",
              "type": "string"
            }
          ],
          "internalType": "struct NewContract.testStruct",
          "name": "",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "addToArray",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "atrr",
              "type": "string"
            }
          ],
          "internalType": "struct NewContract.testStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]