pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./nft.sol";
import "./ownable.sol";

/**
   Smart contract to hold the user data also imports the Ownable and NFT smart contracts
 */
contract User is NFT,Ownable{

    // event for new created users
    event UserCreatedStatus(string stateMsg,bool result);

    // user data structure
    struct UserData {
        string userName; // a user nickname

        // Useful for checking if an object already exist in users[]. Must be set to true at UserData object creation time.
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

        // create the Object UserData
        UserData memory user = UserData(_name,true,4,msg.sender);

        // set the mapping user that called the _createUser to their address
        users[msg.sender] = user;
        // initialize  the mapping of user => NFT to 0 
        ownerNFTCount[msg.sender] = 0;

    }

    /**

     * @dev Function to retrieve user data if it exists
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


        // check the there is a user with the specified address 
        if (users[msg.sender].exist == false) {
            _createUser(_name);
            // emit an event to indicate a new user was created 
            emit UserCreatedStatus("New User Created!",true);
         
        } else {
            //  user already exists emit an event
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

        // create a user if they don't exist
        CheckAndCreateUser(userName);

        // mint a new NFT using NFT contract method _mintERC721Token
        _mintERC721Token(name, value, category, artFileUrl);
    }
}
