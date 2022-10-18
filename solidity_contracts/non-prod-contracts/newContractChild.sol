pragma solidity >=0.5.0 <0.6.0;

pragma experimental ABIEncoderV2;


contract NewContractChild {

    event etherEvent(string val1,uint val2);


    address public owner;

    string public message;


     constructor() public{

        owner = msg.sender;

        message = "Child Contract";
    }


}


