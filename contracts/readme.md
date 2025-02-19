# Tamil Literature NFT Platform

A decentralized platform for preserving Tamil literary works as NFTs on the Ethereum blockchain.

![Tamil Literature NFT](platform-screenshot.png)

## Overview

The Tamil Literature NFT platform enables the preservation and trading of Tamil literary works as NFTs. It features role-based access control, curator verification, automated royalties, and comprehensive metadata management.

**Current Version:** 1.0.0  
**Developer:** [@vmmuthu31](https://github.com/vmmuthu31)

## Features

- 🏛️ Permanent preservation of Tamil literature on blockchain
- ✅ Curator verification system
- 💰 Automatic royalty distribution (2.5% default)
- 🔐 Role-based access control
- 📚 Comprehensive metadata management
- 🌐 Global accessibility

## Smart Contract Functions

### Core Minting Functions

#### `mintLiterature`

Mints a single Tamil literature NFT.

```solidity
function mintLiterature(
    address recipient,    // NFT receiver address
    string uri,          // IPFS/metadata URI
    string title,        // Work title (must be unique)
    string author,       // Author name
    uint256 year,       // Year of creation
    string category,    // Work category
    string workType     // Type of literary work
) public payable
```

**Cost:** 0.01 ETH (free for MINTER_ROLE)

#### `batchMintLiterature`

Mints multiple NFTs in one transaction.

```solidity
function batchMintLiterature(MintParams[] params)
```

**Limit:** Maximum 20 NFTs per batch

### Metadata Management

#### `updateMetadata`

Updates existing NFT metadata.

```solidity
function updateMetadata(
    uint256 tokenId,    // Token ID
    string newTitle,    // New title
    string newAuthor,   // New author
    uint256 newYear,    // New year
    string newCategory, // New category
    string newWorkType  // New work type
)
```

**Required Role:** UPDATER_ROLE

### Verification System

#### `verifyLiterature`

Verifies the authenticity of literary work.

```solidity
function verifyLiterature(uint256 tokenId)
```

**Required Role:** CURATOR_ROLE

### Financial Functions

#### `withdrawRoyalties`

Withdraws accumulated royalties.

```solidity
function withdrawRoyalties()
```

#### `calculateRoyalty`

Calculates royalty amount for a sale.

```solidity
function calculateRoyalty(
    uint256 tokenId,    // Token ID
    uint256 salePrice   // Sale price
) returns (uint256)
```

### Administrative Functions

| Function               | Description        | Required Role  |
| ---------------------- | ------------------ | -------------- |
| `pauseMinting()`       | Pause NFT minting  | ADMIN_ROLE     |
| `unpauseMinting()`     | Resume NFT minting | ADMIN_ROLE     |
| `setBlacklistStatus()` | Manage blacklist   | MODERATOR_ROLE |
| `setTokenRoyalty()`    | Set custom royalty | ADMIN_ROLE     |

### Query Functions

```solidity
getTokensByCategory(string category) → uint256[]
getTokensByAuthor(string author) → uint256[]
tokensOfOwner(address owner) → uint256[]
```

## Role-Based Access Control

| Role           | Permissions               |
| -------------- | ------------------------- |
| MINTER_ROLE    | Can mint NFTs without fee |
| CURATOR_ROLE   | Can verify literature     |
| ADMIN_ROLE     | Full platform control     |
| MODERATOR_ROLE | Can manage blacklist      |
| UPDATER_ROLE   | Can update metadata       |

## Metadata Structure

```json
{
  "title": "Work Title",
  "author": "Author Name",
  "year": "Publication Year",
  "category": "Work Category",
  "language": "Tamil",
  "workType": "Type of Work",
  "creator": "Creator Address",
  "createdAt": "Timestamp",
  "isVerified": false,
  "lastUpdated": "Timestamp",
  "lastUpdatedBy": "Address"
}
```

## Platform Constants

```solidity
MAX_SUPPLY = 10000            // Maximum NFTs
mintPrice = 0.01 ether        // Mint price
royaltyBasisPoints = 250      // 2.5% default royalty
MINT_COOLDOWN = 1 hours       // Time between mints
MAX_BATCH_SIZE = 20          // Max batch mint size
```

## Getting Started

1. **Connect Wallet**

   ```javascript
   // Connect to Ethereum network
   await window.ethereum.request({ method: "eth_requestAccounts" });
   ```

2. **Mint Literature**

   ```javascript
   const mintPrice = await contract.mintPrice();
   await contract.mintLiterature(
     recipient,
     uri,
     title,
     author,
     year,
     category,
     workType,
     { value: mintPrice }
   );
   ```

3. **Verify Work** (Curators Only)
   ```javascript
   await contract.verifyLiterature(tokenId);
   ```

## Security Features

- ReentrancyGuard implementation
- Role-based access control
- Blacklist system
- Emergency pause functionality
- Cooldown periods
- Batch size limits

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE.md

## Contact

- Developer: [@vmmuthu31](https://github.com/vmmuthu31)
- Email: [mvairamuthu2003@gmail.com]

## Acknowledgments

- OpenZeppelin for smart contract libraries
- Tamil Literature community for guidance
- Web3 community for support
