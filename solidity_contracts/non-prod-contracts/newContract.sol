pragma solidity >=0.5.0 <0.6.0;

pragma experimental ABIEncoderV2;


import "./newContractChild.sol";

contract NewContract is NewContractChild{

    event etherEvent(string val1,uint val2);


    address public owner;


     constructor() public{

        owner = msg.sender;
    }

    struct testStruct {
        string atrr;
    }

    testStruct[] public list;

    function returnStruct() public pure returns(testStruct memory) {


        testStruct memory myStrcut = testStruct("Hi there this is a call from Ethereum world !");


        return myStrcut;


    }


    function addToArray() public returns(testStruct[] memory){


        testStruct memory myStrcut = testStruct(" Hi there this is a call hello from Ethereum!");

        
        list.push(myStrcut);

         emit etherEvent("event message", now);


    }



}


