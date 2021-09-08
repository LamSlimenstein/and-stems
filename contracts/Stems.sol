pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Stems is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenNums;

    event ForagedStem(
        address indexed _forager,
        uint256 indexed _tokenId
    );

    uint256 public nextTokenId;
    uint256 public lastTokenId;
    uint256 public stemPriceInWei;
    uint256 public maxStems;

    string public baseURI;
    string public baseIpfs;
    string public scriptJson;
    string public script;

    uint256 private nonce;

    mapping (bytes32 => uint256) public hashToId;
    mapping (uint256 => bytes32) internal idToHash; 

    bool private is_dis_on;

    constructor(uint256 _stemPriceInWei, uint256 _maxStems) ERC721('andStems','STEMS') {
        maxStems = _maxStems;
        stemPriceInWei = _stemPriceInWei;
    }

    modifier started() {
        require(is_dis_on, "Contract must be started in order to ape.");
        _;
    }

    modifier stopped() {
        require(!is_dis_on, "Contract needs to be stopped fren.");
        _;
    }

    modifier apeable() {
        require(_tokenNums.current() + 1 <= maxStems, "Value error.");
        require(msg.value == stemPriceInWei, "Value error. Please try to ape again after thinking on it.");
        _;
    }

    function on_off_button() public onlyOwner returns (bool) {
        is_dis_on = !is_dis_on;
        return true;
    }

    function updatePrice(uint256 _stemPriceInWei) public onlyOwner stopped returns (bool) {
        stemPriceInWei = _stemPriceInWei;
        return true;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function mintStem() external payable started apeable returns (uint256 _tokenId) {
        address _forager = msg.sender;

        uint256 tokenId = _mintStem(_forager);

        return tokenId;
    }

    function _mintStem(address _forager) internal returns (uint256) {
        _tokenNums.increment();
        uint256 _tokenId = _tokenNums.current();

        bytes32 hash = keccak256(abi.encodePacked(_tokenId, block.number, blockhash(block.number - 1), msg.sender));
        idToHash[_tokenId] = hash;
        hashToId[hash] = _tokenId;

        _safeMint(_forager, _tokenId);

        emit ForagedStem(_forager, _tokenId);

        return _tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return 'https://frozen-crag-92247.herokuapp.com/';
    }
}