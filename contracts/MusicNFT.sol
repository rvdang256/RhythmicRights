// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MusicMintNFT is ERC721, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Mapping from token ID to metadata URI
    mapping(uint256 => string) private _tokenURIs;

    
    event Minted(address indexed _to, uint256 indexed _tokenId, string _tokenURI);
      // Mapping from token ID to minter address
    mapping(uint256 => address) public _minters;

    constructor()
        ERC721("Music Minted", "MM")
        Ownable(msg.sender)
    {}

    
    //Takes in a URI and assigns the tokenID to the URI, and assigns the the tokenID to the minter
    function safeMint(string memory _tokenURI) public  {
        require(bytes(_tokenURI).length > 0, "Empty URI");

        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _minters[tokenId] = msg.sender;


        _tokenIdCounter.increment();
        emit Minted(msg.sender, tokenId, _tokenURI);
        
    }

    //Assigns the tokenID to the URI
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) public  {
        _tokenURIs[tokenId] = _tokenURI;
    }

   

    //Gets all the URIS of the person calling the contract by looping through and checking to 
    //see if the msg.sender holds the specific tokenID
    function getAllTokenURIs() public view returns (string[] memory) {
        uint256 totalTokens = _tokenIdCounter.current();
        string[] memory uris = new string[](totalTokens);
        for (uint256 i = 0; i < totalTokens; i++) {
            if (_minters[i] == msg.sender) {
                uris[i] = _tokenURIs[i];
            }
        }
        return uris;
    }

    








}