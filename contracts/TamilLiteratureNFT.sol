// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title TamilLiteratureNFT
 * @dev Implementation of a Tamil Literature NFT platform with role-based access control
 * @author vmmuthu31
 * @notice This contract implements an NFT platform specifically designed for Tamil literature,
 * featuring role-based access control, metadata management, and royalty distribution.
 */
contract TamilLiteratureNFT is 
    ERC721URIStorage,
    ERC721Enumerable,
    AccessControl,
    ReentrancyGuard 
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant CURATOR_ROLE = keccak256("CURATOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");

    Counters.Counter private _tokenIds;

    // Constants
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice = 0.01 ether;
    uint256 public royaltyBasisPoints = 250; // 2.5%
    bool public mintingPaused;
    mapping(address => uint256) public lastMintTime;
    mapping(uint256 => uint256) public tokenRoyaltyRates;
    uint256 public constant MINT_COOLDOWN = 1 hours;
    uint256 public constant MAX_BATCH_SIZE = 20;

    struct LiteratureMetadata {
        string title;
        string author;
        uint256 year;
        string category;
        string language;
        string workType;
        address creator;
        uint256 createdAt;
        bool isVerified;
        uint256 lastUpdated;
        address lastUpdatedBy;
    }

    struct MintParams {
        address recipient;
        string uri;
        string title;
        string author;
        uint256 year;
        string category;
        string workType;
    }

    // Modifiers
    modifier whenNotPaused() {
        require(!mintingPaused, "Minting is paused");
        _;
    }

    modifier validMintCooldown() {
        require(
            block.timestamp >= lastMintTime[msg.sender] + MINT_COOLDOWN,
            "Must wait for cooldown"
        );
        _;
    }

    // Mappings
    mapping(uint256 => LiteratureMetadata) public literatureData;
    mapping(string => bool) public titleExists;
    mapping(uint256 => address) public tokenRoyalties;
    mapping(address => uint256) public royaltiesOwed;
    mapping(string => uint256[]) private _categoryTokens;
    mapping(string => uint256[]) private _authorTokens;
    mapping(address => bool) public blacklistedAddresses;

    // Events
    event LiteratureMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string title,
        string author,
        uint256 year
    );
    event LiteratureVerified(uint256 indexed tokenId, address indexed curator);
    event RoyaltyPaid(address indexed recipient, uint256 amount);
    event MintPriceUpdated(uint256 newPrice);
    event MetadataUpdated(
        uint256 indexed tokenId,
        string oldTitle,
        string newTitle,
        address indexed updater,
        uint256 timestamp
    );
    event BatchMinted(
        address indexed creator,
        uint256[] tokenIds,
        uint256 timestamp
    );
    event RoleUpdated(
        bytes32 indexed role,
        address indexed account,
        bool indexed status,
        uint256 timestamp
    );
    event RoyaltyUpdated(
        uint256 indexed tokenId,
        uint256 oldRate,
        uint256 newRate,
        uint256 timestamp
    );
    event AddressBlacklisted(address indexed account, bool status);
    event TokenURIUpdated(uint256 indexed tokenId, string newUri);
    event RoyaltyRateUpdated(uint256 newRate);
    event MintingPaused(address indexed pauser);
    event MintingUnpaused(address indexed unpauser);
    event EmergencyWithdraw(address indexed admin, uint256 amount);

    constructor() ERC721("Tamil Literature NFT", "TLNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(CURATOR_ROLE, msg.sender);
        _grantRole(MODERATOR_ROLE, msg.sender);
        _grantRole(UPDATER_ROLE, msg.sender);
    }

   function mintLiterature(
        address recipient,
        string calldata uri,
        string calldata title,
        string calldata author,
        uint256 year,
        string calldata category,
        string calldata workType
    ) public payable nonReentrant whenNotPaused validMintCooldown returns (uint256) {
        lastMintTime[msg.sender] = block.timestamp;
        require(!blacklistedAddresses[msg.sender], "Sender is blacklisted");
        require(hasRole(MINTER_ROLE, msg.sender) || msg.value >= mintPrice, "Insufficient payment or not authorized");
        require(!titleExists[title], "Title already exists");
        require(_tokenIds.current() < MAX_SUPPLY, "Maximum supply reached");
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(author).length > 0, "Author cannot be empty");
        require(year <= block.timestamp, "Invalid year");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, uri);

        literatureData[newTokenId] = LiteratureMetadata({
            title: title,
            author: author,
            year: year,
            category: category,
            language: "Tamil",
            workType: workType,
            creator: recipient,
            createdAt: block.timestamp,
            isVerified: false,
            lastUpdated: block.timestamp,
            lastUpdatedBy: msg.sender
        });

        titleExists[title] = true;
        tokenRoyalties[newTokenId] = recipient;
        _categoryTokens[category].push(newTokenId);
        _authorTokens[author].push(newTokenId);

        emit LiteratureMinted(newTokenId, recipient, title, author, year);
        return newTokenId;
    }

    function batchMintLiterature(MintParams[] calldata params) 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
        returns (uint256[] memory) 
    {
        require(params.length <= MAX_BATCH_SIZE, "Batch too large");
        require(!blacklistedAddresses[msg.sender], "Sender is blacklisted");
        require(msg.value >= mintPrice * params.length || hasRole(MINTER_ROLE, msg.sender), 
            "Insufficient payment");
        
        uint256[] memory tokenIds = new uint256[](params.length);
        
        for(uint256 i = 0; i < params.length; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            tokenIds[i] = newTokenId;

            _safeMint(params[i].recipient, newTokenId);
            _setTokenURI(newTokenId, params[i].uri);

            require(!titleExists[params[i].title], "Title already exists");
            require(bytes(params[i].title).length > 0, "Title cannot be empty");
            require(bytes(params[i].author).length > 0, "Author cannot be empty");
            require(params[i].year <= block.timestamp, "Invalid year");

            literatureData[newTokenId] = LiteratureMetadata({
                title: params[i].title,
                author: params[i].author,
                year: params[i].year,
                category: params[i].category,
                language: "Tamil",
                workType: params[i].workType,
                creator: params[i].recipient,
                createdAt: block.timestamp,
                isVerified: false,
                lastUpdated: block.timestamp,
                lastUpdatedBy: msg.sender
            });

            titleExists[params[i].title] = true;
            tokenRoyalties[newTokenId] = params[i].recipient;
            _categoryTokens[params[i].category].push(newTokenId);
            _authorTokens[params[i].author].push(newTokenId);

            emit LiteratureMinted(
                newTokenId,
                params[i].recipient,
                params[i].title,
                params[i].author,
                params[i].year
            );
        }
        
        emit BatchMinted(msg.sender, tokenIds, block.timestamp);
        return tokenIds;
    }


    function updateMetadata(
        uint256 tokenId,
        string calldata newTitle,
        string calldata newAuthor,
        uint256 newYear,
        string calldata newCategory,
        string calldata newWorkType
    ) external {
        require(!blacklistedAddresses[msg.sender], "Sender is blacklisted");
        require(hasRole(UPDATER_ROLE, msg.sender), "Must have updater role");
        require(_exists(tokenId), "Token does not exist");
        
        string memory oldTitle = literatureData[tokenId].title;
        delete titleExists[oldTitle];
        require(!titleExists[newTitle] || keccak256(bytes(oldTitle)) == keccak256(bytes(newTitle)), "New title already exists");
        
        // Remove from old category and author mappings
        _removeFromArray(_categoryTokens[literatureData[tokenId].category], tokenId);
        _removeFromArray(_authorTokens[literatureData[tokenId].author], tokenId);

        literatureData[tokenId] = LiteratureMetadata({
            title: newTitle,
            author: newAuthor,
            year: newYear,
            category: newCategory,
            language: "Tamil",
            workType: newWorkType,
            creator: literatureData[tokenId].creator,
            createdAt: literatureData[tokenId].createdAt,
            isVerified: false,
            lastUpdated: block.timestamp,
            lastUpdatedBy: msg.sender
        });
        
        // Add to new category and author mappings
        _categoryTokens[newCategory].push(tokenId);
        _authorTokens[newAuthor].push(tokenId);
        titleExists[newTitle] = true;

        emit MetadataUpdated(tokenId, oldTitle, newTitle, msg.sender, block.timestamp);
    }

    function verifyLiterature(uint256 tokenId) external {
        require(!blacklistedAddresses[msg.sender], "Sender is blacklisted");
        require(hasRole(CURATOR_ROLE, msg.sender), "Must have curator role");
        require(_exists(tokenId), "Token does not exist");
        require(!literatureData[tokenId].isVerified, "Token already verified");
        
        literatureData[tokenId].isVerified = true;
        literatureData[tokenId].lastUpdated = block.timestamp;
        literatureData[tokenId].lastUpdatedBy = msg.sender;

        emit LiteratureVerified(tokenId, msg.sender);
    }

    function withdrawRoyalties() external nonReentrant {
        require(!blacklistedAddresses[msg.sender], "Sender is blacklisted");
        uint256 amount = royaltiesOwed[msg.sender];
        require(amount > 0, "No royalties to withdraw");
        
        royaltiesOwed[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit RoyaltyPaid(msg.sender, amount);
    }

    function setBlacklistStatus(address account, bool status) external {
        require(hasRole(MODERATOR_ROLE, msg.sender), "Must have moderator role");
        blacklistedAddresses[account] = status;
        emit AddressBlacklisted(account, status);
    }

    // Helper functions
    function _removeFromArray(uint256[] storage array, uint256 value) internal {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == value) {
                array[i] = array[array.length - 1];
                array.pop();
                break;
            }
        }
    }

    function _exists(uint256 tokenId) internal view override returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function getTokensByCategory(string calldata category) external view returns (uint256[] memory) {
        return _categoryTokens[category];
    }

    function getTokensByAuthor(string calldata author) external view returns (uint256[] memory) {
        return _authorTokens[author];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721URIStorage, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Pauses minting functionality
     * @notice Only admin can pause minting
     */
    function pauseMinting() external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin only");
        mintingPaused = true;
        emit MintingPaused(msg.sender);
    }

    /**
     * @dev Unpauses minting functionality
     * @notice Only admin can unpause minting
     */
    function unpauseMinting() external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin only");
        mintingPaused = false;
        emit MintingUnpaused(msg.sender);
    }

    /**
     * @dev Updates the token URI
     * @param tokenId Token ID to update
     * @param newUri New URI to set
     */
    function updateTokenURI(uint256 tokenId, string calldata newUri) external {
        require(hasRole(UPDATER_ROLE, msg.sender), "Must have updater role");
        require(_exists(tokenId), "Token does not exist");
        _setTokenURI(tokenId, newUri);
        emit TokenURIUpdated(tokenId, newUri);
    }

    /**
     * @dev Sets custom royalty rate for a specific token
     * @param tokenId Token ID to set royalty for
     * @param rate New royalty rate in basis points
     */
    function setTokenRoyalty(uint256 tokenId, uint256 rate) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Admin only");
        require(rate <= 1000, "Max 10% royalty");
        tokenRoyaltyRates[tokenId] = rate;
        emit RoyaltyUpdated(tokenId, royaltyBasisPoints, rate, block.timestamp);
    }

    /**
     * @dev Emergency withdrawal of contract funds
     * @notice Only admin can perform emergency withdrawal
     */
    function emergencyWithdraw() external nonReentrant {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin only");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Transfer failed");
        emit EmergencyWithdraw(msg.sender, balance);
    }

    /**
     * @dev Gets all tokens owned by an address
     * @param owner Address to query
     * @return uint256[] Array of token IDs owned by the address
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokens = new uint256[](tokenCount);
        for(uint256 i = 0; i < tokenCount; i++) {
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokens;
    }

    /**
     * @dev Calculates royalty for a token sale
     * @param tokenId Token ID to calculate royalty for
     * @param salePrice Sale price of the token
     */
    function calculateRoyalty(uint256 tokenId, uint256 salePrice) public view returns (uint256) {
        uint256 rate = tokenRoyaltyRates[tokenId] > 0 ? 
            tokenRoyaltyRates[tokenId] : royaltyBasisPoints;
        return (salePrice * rate) / 10000;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}