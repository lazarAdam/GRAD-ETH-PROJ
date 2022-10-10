pragma solidity >=0.5.0 <0.6.0;

import "./erc721.sol";

contract NFT is ERC721 {
    struct Nft {
        string name;
        string NftCategory;
        uint256 value;
        string artFileUrl;
    }

    event NewNFTCreated(uint256 NFTid, string name);

    mapping(uint256 => address) public NFTOwner;
    mapping(address => uint256) ownerNFTCount;
    mapping(uint256 => address) NFTApprovals;

    Nft[] public NFTsList;



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
        uint256 NFTid = NFTsList.push(Nft(name, category, value, artFileUrl)) -
            1;

        NFTOwner[NFTid] = msg.sender;

        ownerNFTCount[msg.sender]++;

        emit NewNFTCreated(NFTid, name);
    }

    function _transferNFT(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {}

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

        //1. check if sender has enough ether for the NFT  they want to transfer

        // 2. transfer the NFT to the New user

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
         NFTApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
}
