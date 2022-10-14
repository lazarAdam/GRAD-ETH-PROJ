export const testABI2=
[
	{
		"constant": false,
		"inputs": [],
		"name": "addToArray",
		"outputs": [
			{
				"components": [
					{
						"name": "atrr",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "val1",
				"type": "string"
			},
			{
				"indexed": false,
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "list",
		"outputs": [
			{
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
		"name": "returnStruct",
		"outputs": [
			{
				"components": [
					{
						"name": "atrr",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]