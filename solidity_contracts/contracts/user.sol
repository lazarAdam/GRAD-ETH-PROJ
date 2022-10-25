pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./nft.sol";
import "./ownable.sol";


contract User is NFT, Ownable{


    event UserCreatedStatus(string stateMsg,bool result);

    // user data structure
    struct UserData {
        string userName; // a user nickname

        // Useful for checking if an object already exist in users. Must be set to true at UserData object creation time.
        bool exist; 
        uint256 mintingLimit;
        address account;
    }

    // mapping to store a User object for the user that created it.
    mapping(address => UserData) public users;

    /**
     *
     * @dev Function to create a new user and add them to the users mapping
     */
    function _createUser(string memory _name) private {

        UserData memory user = UserData(_name,true,4,msg.sender);

        users[msg.sender] = user;

        ownerNFTCount[msg.sender] = 0;

    }

    /**

     * @dev Function to retrieve an existing user data
     */

    function getUserData()
        public
        view
        returns (UserData memory)
    {
        return (users[msg.sender]);
    }

    /**
     *
     * @dev Function to create a new user and add them to the users mapping if they don't exist
     * @return true if the user was added
     * @return false if the user already exists
     */

    function CheckAndCreateUser(string memory _name) private  {


        if (users[msg.sender].exist == false) {
            _createUser(_name);

            emit UserCreatedStatus("New User Created!",true);
         
        } else {
            
             emit UserCreatedStatus("User exists !",false);

        }
        
    }

    /**
     *
     * @dev Function to create a new NFT for a user calling this function
     */
    function createNewNFT(
        string memory name,
        uint256 value, 
        string memory category,
        string memory artFileUrl,
        string memory userName
    ) public {
        // make sure the user hasn't passed the limit of how many NFTs they can mint
        // the limit can be adjust later based on the user activity
        require(ownerNFTCount[msg.sender] <= users[msg.sender].mintingLimit);

        CheckAndCreateUser(userName);


        _mintERC721Token(name, value, category, artFileUrl);
    }
}
