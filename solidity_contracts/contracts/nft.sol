pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./erc721.sol";
import "./safemath.sol";

/**
    NFT smart contract implements the specs of ERC721 tokes that includes approve,transferFrom,ownerOf,balanceOf
    NFT smart contract will also hold the data of each minted NFT token in a storage array data structure, along with
    some mappings such as NFTOwner,ownerNFTCount, and NFTApprovals
 */
contract NFT is ERC721 {
    using SafeMath for uint256;

    // NFT struct that represent an ERC721 token
    struct Nft {
        uint256 ID; // ID for the NFT used as index to retrieve an NFT struct from NFTsList
        string name; // given name of the NFT
        string NftCategory; // photograph, digital art,.... (will be set in the front-end)
        uint256 value; // value must be converted to Wei from the front-end
        string artFileUrl; // url to the art. usually hosted off chain or on IPFS
    }

    event NewNFTCreated(uint256 NFTid, string name);

    mapping(uint256 => address) public NFTOwner; // Mapping of NFT id to  an address of an EOA account(current owner)
    mapping(address => uint256) public ownerNFTCount; // the number of NFT that an user has minted
    mapping(uint256 => address) public NFTApprovals; // mapping for approved user to claim an NFT
    Nft[] public NFTsList; // Array in storage that holds objects of Nft and addressed using the the NFT id as an index





    // A modifier method used by other methods that would like to restrict access to executing the method to only
    // the owner of an NFT. Will come handy with the approve method
    modifier onlyOwnerOf(uint256 _NFTid) {
        require(msg.sender == NFTOwner[_NFTid], "You are not the owner !");
        _;
    }

    /**

     * @dev Method to mint a new NFT token
     */
    function _mintERC721Token(
        string memory name, // name set by the front end
        uint256 value, // desired value in Wei
        string memory category, // category
        string memory artFileUrl // url of the NFT art
    ) internal {
        // NFTsList.push() will return a number starting form 1, we want the ID to start form 0,1,2,3... since it will
        // used to as an index to address the NFT in  NFTsList[]
        // To properly address the NFTsList[] we subtract 1 from the push() returned value.
        uint256 NFTid = NFTsList.push(
            Nft(0, name, category, value, artFileUrl)
        ) - 1;

        // use the returned index as the NFTid
        NFTsList[NFTid].ID = NFTid;

        //  set the NFTOwner mapping to with the NFTid to point to caller's address (Creator in this case)
        NFTOwner[NFTid] = msg.sender;

        // increment the  number of minted NFT for the caller using  ownerNFTCount mapping
        ownerNFTCount[msg.sender] = ownerNFTCount[msg.sender].add(1);

        // emit an event for the front-end
        emit NewNFTCreated(NFTid, name);
    }

    /**

     * @dev Method the sets the new owner of an NFT 
     */
    function _transferNFT(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
        // increase the count of NFTs for the new owner
        ownerNFTCount[_to] = ownerNFTCount[_to].add(1);

        // decrease the count of NFTs for the old owner
        ownerNFTCount[_from] = ownerNFTCount[_from].sub(1);

        // set the NFT to point to the new owner's address using NFTOwner mapping
        NFTOwner[_tokenId] = _to;
    }

    /**

     * @dev method to get the number of NFT's a caller has
       @return uint as the count
     */
    function balanceOf(address _owner) external view returns (uint256) {
        return ownerNFTCount[_owner];
    }

    /**

     * @dev method to get the address of the an NFT owner
       @return address of the owner
     */
    function ownerOf(uint256 _tokenId) external view returns (address) {
        return NFTOwner[_tokenId];
    }

    /**

     * @dev public payable method that gets called  from the front-end using metamask as the user account and web.js
     * this method will call _transferNFT to transfer the NFT ownership and transfers the amount set in the 
     * transaction from the sender's address to the receiver's (caller) address 
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable {
        //1.check if sender sent enough ether for the NFT they want to acquire
        // or check if they are pr-approved by the owner

        require(
            NFTsList[_tokenId].value == msg.value ||
                NFTApprovals[_tokenId] == msg.sender,
            "You don't have enough funds for this transfer!"
        );

        // 2. transfer the NFT to the new owner
        _transferNFT(_from, _to, _tokenId);

        //3.send the Ether to the previous owner's account

        //3.1 convert the _from (previous owner's address) to a payable address of 160 bit length

        address payable _oldOwnerAddress = address(uint160(_from));

        //3.2 transfer the ether to _oldOwnerAddress
        _oldOwnerAddress.transfer(msg.value);

        //4. emit an event to the front-end indicating that the transfer was a success
        emit Transfer(_from, _to, _tokenId);
    }

    /**

     * @dev method that allows only the owner of an NFT using the modifier onlyOwnerOf to approve an other user
     * to transfer ownership 
     */
    function approve(address _approved, uint256 _tokenId)
        external
        payable
        onlyOwnerOf(_tokenId)
    {
        NFTApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    /**
        @dev  method that returns the entire NFTsList
        @return Nft[] 
     */
    function getAllNFTs() external view returns (Nft[] memory) {
        return NFTsList;
    }

    // function getAllNFTs() external view  {

    //         // return the array of Nft objects

    //         // ask the question how expensive to call  view func on array of 1000 items

    //         //how does public key/private get generated when an nft is minted and transferred

    //         // how does the array works as it gets bigger, expensive amd limits of sizing

    // }
}
