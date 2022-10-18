pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;


import "./erc721.sol";
import "./safemath.sol";

contract NFT is ERC721 {

    using SafeMath for uint256;

    struct Nft {
        string name;
        string NftCategory; // photograph, digital art,.... (will be set in the front-end)
        uint256 value;// value must be converted to Wei from the front-end
        string artFileUrl; // this a static image file hosted off the chain
    }

    event NewNFTCreated(uint256 NFTid, string name);

    mapping(uint256 => address) public NFTOwner;
    mapping(address => uint256) ownerNFTCount;
    mapping(uint256 => address) NFTApprovals;

    Nft[] public NFTsList; // check how large an array can be 

    modifier onlyOwnerOf(uint256 _NFTid) {
        require(msg.sender == NFTOwner[_NFTid]);
        _;
    }

    function _mintERC721Token(
        string memory name,
        uint256 value,
        string memory category,
        string memory artFileUrl
    ) internal {

        // NFTsList.push() will return an index starting form 1, we want the index to start form 0,1,2,3...
        // To properly address the NFTsList[] we subtract 1 from the push() returned value. 
        uint256 NFTid = NFTsList.push(Nft(name, category, value, artFileUrl)) - 1;

        NFTOwner[NFTid] = msg.sender;

        ownerNFTCount[msg.sender] = ownerNFTCount[msg.sender].add(1);

        emit NewNFTCreated(NFTid, name);
    }

    function _transferNFT(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
        // increase the count of NFTs for the new owner
        ownerNFTCount[_to] = ownerNFTCount[_to].add(1);

        // decrease the count of NFTs for the old owner
        ownerNFTCount[_from]= ownerNFTCount[_to].sub(1);

        // set the NFT to point to the new owner's address
        NFTOwner[_tokenId] = _to;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerNFTCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return NFTOwner[_tokenId];
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable {
        //1.check if sender send enough ether for the NFT they want to acquire
        // or check if they are pr-approved by the owner

        require(
            NFTsList[_tokenId].value == msg.value || NFTApprovals[_tokenId] == msg.sender
                );

        // 2. transfer the NFT to the new owner
        _transferNFT(_from, _to, _tokenId);

        //3.send the Ether to the previous owner's account

        //3.1 convert the _from (previous owner's address) to a payable address

        address payable _oldOwnerAddress = address(uint160(_from));

        //3.2 transfer the ether to _oldOwnerAddress 
        _oldOwnerAddress.transfer(msg.value);


        //4. emit an event to the front-end indicating that the transfer was a success
        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId)
        external
        payable
        onlyOwnerOf(_tokenId)
    {
        NFTApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }



    function getNFTsByUser() external view  returns(string memory) {

        // 1. loop over NFTsList:
            //search for all the NFTs owner by the caller

            string memory x  = "565656";

            // add them to a temporary  array in memory 

            return x;
            // return the array of Nft objects
        
    }

    
    function getAllNFTs() external view  {

            // return the array of Nft objects

            // ask the question how expensive to call  view func on array of 1000 items 

            //how does public key/private get generated when an nft is minted and transferred

            // how does the array works as it gets bigger, expensive amd limits of sizing  
        
    }
}
