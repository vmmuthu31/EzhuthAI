const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("TamilLiteratureNFT", function () {
  let TamilLiteratureNFT;
  let nft;
  let owner;
  let minter;
  let curator;
  let updater;
  let moderator;
  let user;
  const MINT_PRICE = ethers.utils.parseEther("0.01");

  beforeEach(async function () {
    [owner, minter, curator, updater, moderator, user] =
      await ethers.getSigners();

    TamilLiteratureNFT = await ethers.getContractFactory("TamilLiteratureNFT");
    nft = await TamilLiteratureNFT.deploy();
    await nft.deployed();

    // Grant roles
    const minterRole = await nft.MINTER_ROLE();
    const curatorRole = await nft.CURATOR_ROLE();
    const updaterRole = await nft.UPDATER_ROLE();
    const moderatorRole = await nft.MODERATOR_ROLE();
    const adminRole = await nft.ADMIN_ROLE();

    await nft.grantRole(adminRole, owner.address);
    await nft.grantRole(minterRole, minter.address);
    await nft.grantRole(curatorRole, curator.address);
    await nft.grantRole(updaterRole, updater.address);
    await nft.grantRole(moderatorRole, moderator.address);
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await nft.name()).to.equal("Tamil Literature NFT");
      expect(await nft.symbol()).to.equal("TLNFT");
    });

    it("Should assign roles correctly", async function () {
      const adminRole = await nft.DEFAULT_ADMIN_ROLE();
      expect(await nft.hasRole(adminRole, owner.address)).to.be.true;
    });
  });

  describe("Minting", function () {
    const mintData = {
      uri: "ipfs://test",
      title: "Test Title",
      author: "Test Author",
      year: 2024,
      category: "Poetry",
      workType: "Poem",
    };

    it("Should mint a new token with correct payment", async function () {
      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            mintData.uri,
            mintData.title,
            mintData.author,
            mintData.year,
            mintData.category,
            mintData.workType,
            { value: MINT_PRICE }
          )
      ).to.emit(nft, "LiteratureMinted");

      expect(await nft.balanceOf(user.address)).to.equal(1);
    });

    it("Should fail when minting with insufficient payment", async function () {
      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            mintData.uri,
            mintData.title,
            mintData.author,
            mintData.year,
            mintData.category,
            mintData.workType,
            { value: MINT_PRICE.div(2) }
          )
      ).to.be.revertedWith("Insufficient payment or not authorized");
    });

    it("Should allow minter role to mint without payment", async function () {
      await expect(
        nft
          .connect(minter)
          .mintLiterature(
            user.address,
            mintData.uri,
            mintData.title,
            mintData.author,
            mintData.year,
            mintData.category,
            mintData.workType
          )
      ).to.emit(nft, "LiteratureMinted");
    });
  });

  describe("Batch Minting", function () {
    it("Should batch mint multiple tokens", async function () {
      const timestamp = Date.now();
      const mintParams = [
        {
          recipient: user.address,
          uri: `ipfs://test1${timestamp}`,
          title: `Title 1 ${timestamp}`,
          author: `Author 1 ${timestamp}`,
          year: 2024,
          category: "Poetry",
          workType: "Poem",
        },
        {
          recipient: user.address,
          uri: `ipfs://test2${timestamp}`,
          title: `Title 2 ${timestamp}`,
          author: `Author 2 ${timestamp}`,
          year: 2024,
          category: "Prose",
          workType: "Novel",
        },
      ];

      // Connect with minter for batch minting
      await expect(nft.connect(minter).batchMintLiterature(mintParams)).to.emit(
        nft,
        "BatchMinted"
      );

      const balance = await nft.balanceOf(user.address);
      expect(balance).to.equal(2);

      // Verify the minted tokens
      const token1 = await nft.literatureData(1);
      const token2 = await nft.literatureData(2);

      expect(token1.title).to.equal(`Title 1 ${timestamp}`);
      expect(token2.title).to.equal(`Title 2 ${timestamp}`);
    });

    it("Should fail batch minting with duplicate titles", async function () {
      const timestamp = Date.now();
      const mintParams = [
        {
          recipient: user.address,
          uri: `ipfs://test1${timestamp}`,
          title: "Same Title",
          author: `Author 1 ${timestamp}`,
          year: 2024,
          category: "Poetry",
          workType: "Poem",
        },
        {
          recipient: user.address,
          uri: `ipfs://test2${timestamp}`,
          title: "Same Title",
          author: `Author 2 ${timestamp}`,
          year: 2024,
          category: "Prose",
          workType: "Novel",
        },
      ];

      await expect(
        nft.connect(minter).batchMintLiterature(mintParams)
      ).to.be.revertedWith("Title already exists");
    });

    it("Should fail batch minting when exceeding max batch size", async function () {
      const timestamp = Date.now();
      const mintParams = Array(21)
        .fill(null)
        .map((_, i) => ({
          recipient: user.address,
          uri: `ipfs://test${i}${timestamp}`,
          title: `Title ${i} ${timestamp}`,
          author: `Author ${i} ${timestamp}`,
          year: 2024,
          category: "Poetry",
          workType: "Poem",
        }));

      await expect(
        nft.connect(minter).batchMintLiterature(mintParams)
      ).to.be.revertedWith("Batch too large");
    });
  });

  describe("Verification", function () {
    it("Should allow curator to verify literature", async function () {
      const tokenId = await mintToken(user);
      await expect(nft.connect(curator).verifyLiterature(tokenId))
        .to.emit(nft, "LiteratureVerified")
        .withArgs(tokenId, curator.address);

      const literatureData = await nft.literatureData(tokenId);
      expect(literatureData.isVerified).to.be.true;
    });

    it("Should not allow non-curator to verify", async function () {
      const tokenId = await mintToken(user);
      await expect(
        nft.connect(user).verifyLiterature(tokenId)
      ).to.be.revertedWith("Must have curator role");
    });
  });

  describe("Metadata Updates", function () {
    it("Should allow updater to modify metadata", async function () {
      const tokenId = await mintToken(user);
      const newMetadata = {
        title: "Updated Title",
        author: "Updated Author",
        year: 2025,
        category: "Updated Category",
        workType: "Updated Type",
      };

      await expect(
        nft
          .connect(updater)
          .updateMetadata(
            tokenId,
            newMetadata.title,
            newMetadata.author,
            newMetadata.year,
            newMetadata.category,
            newMetadata.workType
          )
      ).to.emit(nft, "MetadataUpdated");

      const updatedData = await nft.literatureData(tokenId);
      expect(updatedData.title).to.equal(newMetadata.title);
    });
  });

  describe("Blacklisting", function () {
    it("Should allow moderator to blacklist address", async function () {
      await expect(
        nft.connect(moderator).setBlacklistStatus(user.address, true)
      )
        .to.emit(nft, "AddressBlacklisted")
        .withArgs(user.address, true);

      expect(await nft.blacklistedAddresses(user.address)).to.be.true;
    });

    it("Should prevent blacklisted address from minting", async function () {
      await nft.connect(moderator).setBlacklistStatus(user.address, true);

      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            "uri",
            "title",
            "author",
            2024,
            "category",
            "workType",
            { value: MINT_PRICE }
          )
      ).to.be.revertedWith("Sender is blacklisted");
    });
  });

  describe("Query Functions", function () {
    it("Should return correct tokens by category", async function () {
      const tokenId = await mintToken(user);
      const tokens = await nft.getTokensByCategory("Poetry");
      expect(tokens[0]).to.equal(tokenId);
    });

    it("Should return correct tokens by author", async function () {
      const timestamp = Date.now();
      const authorName = `Test Author ${timestamp}`;

      // Mint a token with a known author name
      const tx = await nft
        .connect(minter)
        .mintLiterature(
          user.address,
          `ipfs://test${timestamp}`,
          `Test Title ${timestamp}`,
          authorName,
          2024,
          "Poetry",
          "Poem"
        );
      const receipt = await tx.wait();
      const event = receipt.events.find((e) => e.event === "LiteratureMinted");
      const tokenId = event.args.tokenId;

      // Query tokens by the same author name
      const tokens = await nft.getTokensByAuthor(authorName);
      expect(tokens[0]).to.equal(tokenId);
    });
  });

  // Helper function to mint a token for testing
  // Helper function to mint a token for testing
  async function mintToken(recipient) {
    const timestamp = Date.now();
    const tx = await nft
      .connect(minter)
      .mintLiterature(
        recipient.address,
        `ipfs://test${timestamp}`,
        `Test Title ${timestamp}`,
        `Test Author ${timestamp}`,
        2024,
        "Poetry",
        "Poem"
      );
    const receipt = await tx.wait();
    const event = receipt.events.find((e) => e.event === "LiteratureMinted");
    return event.args.tokenId;
  }

  describe("Admin Functions", function () {
    it("Should allow admin to pause minting", async function () {
      await expect(nft.connect(owner).pauseMinting())
        .to.emit(nft, "MintingPaused")
        .withArgs(owner.address);

      expect(await nft.mintingPaused()).to.be.true;

      // Try to mint while paused
      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            "ipfs://test",
            "Test Title",
            "Test Author",
            2024,
            "Poetry",
            "Poem",
            { value: MINT_PRICE }
          )
      ).to.be.revertedWith("Minting is paused");
    });

    it("Should allow admin to unpause minting", async function () {
      await nft.connect(owner).pauseMinting();
      await expect(nft.connect(owner).unpauseMinting())
        .to.emit(nft, "MintingUnpaused")
        .withArgs(owner.address);

      expect(await nft.mintingPaused()).to.be.false;
    });

    it("Should allow admin to perform emergency withdrawal", async function () {
      // First mint a token to add funds to contract
      await nft
        .connect(user)
        .mintLiterature(
          user.address,
          "ipfs://test",
          "Test Title",
          "Test Author",
          2024,
          "Poetry",
          "Poem",
          { value: MINT_PRICE }
        );

      const initialBalance = await ethers.provider.getBalance(owner.address);
      await expect(nft.connect(owner).emergencyWithdraw())
        .to.emit(nft, "EmergencyWithdraw")
        .withArgs(owner.address, MINT_PRICE);

      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance.sub(initialBalance)).to.be.gt(0);
    });
  });

  describe("Royalty System", function () {
    it("Should set token royalty rate", async function () {
      const tokenId = await mintToken(user);
      const newRate = 500; // 5%

      // Grant ADMIN_ROLE to owner if not already granted
      const adminRole = await nft.ADMIN_ROLE();
      if (!(await nft.hasRole(adminRole, owner.address))) {
        await nft.grantRole(adminRole, owner.address);
      }

      await expect(nft.connect(owner).setTokenRoyalty(tokenId, newRate))
        .to.emit(nft, "RoyaltyUpdated")
        .withArgs(tokenId, 250, newRate, await time.latest());

      expect(await nft.tokenRoyaltyRates(tokenId)).to.equal(newRate);
    });

    it("Should calculate royalties correctly", async function () {
      const tokenId = await mintToken(user);
      const salePrice = ethers.utils.parseEther("1");

      // Default royalty (2.5%)
      let royalty = await nft.calculateRoyalty(tokenId, salePrice);
      expect(royalty).to.equal(salePrice.mul(250).div(10000));

      // Grant ADMIN_ROLE to owner if not already granted
      const adminRole = await nft.ADMIN_ROLE();
      if (!(await nft.hasRole(adminRole, owner.address))) {
        await nft.grantRole(adminRole, owner.address);
      }

      // Custom royalty (5%)
      await nft.connect(owner).setTokenRoyalty(tokenId, 500);
      royalty = await nft.calculateRoyalty(tokenId, salePrice);
      expect(royalty).to.equal(salePrice.mul(500).div(10000));
    });
  });

  describe("Token URI Management", function () {
    it("Should update token URI", async function () {
      const tokenId = await mintToken(user);
      const newUri = "ipfs://newtest";

      await expect(nft.connect(updater).updateTokenURI(tokenId, newUri))
        .to.emit(nft, "TokenURIUpdated")
        .withArgs(tokenId, newUri);

      expect(await nft.tokenURI(tokenId)).to.equal(newUri);
    });

    it("Should not allow non-updater to modify URI", async function () {
      const tokenId = await mintToken(user);
      await expect(
        nft.connect(user).updateTokenURI(tokenId, "ipfs://newtest")
      ).to.be.revertedWith("Must have updater role");
    });
  });

  describe("Minting Cooldown", function () {
    it("Should enforce minting cooldown", async function () {
      await nft
        .connect(user)
        .mintLiterature(
          user.address,
          "ipfs://test1",
          "Title 1",
          "Author 1",
          2024,
          "Poetry",
          "Poem",
          { value: MINT_PRICE }
        );

      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            "ipfs://test2",
            "Title 2",
            "Author 2",
            2024,
            "Poetry",
            "Poem",
            { value: MINT_PRICE }
          )
      ).to.be.revertedWith("Must wait for cooldown");

      // Advance time by cooldown period
      await time.increase(3600); // 1 hour

      // Should now be able to mint
      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            "ipfs://test2",
            "Title 2",
            "Author 2",
            2024,
            "Poetry",
            "Poem",
            { value: MINT_PRICE }
          )
      ).to.emit(nft, "LiteratureMinted");
    });
  });

  describe("Token Enumeration", function () {
    it("Should correctly enumerate tokens of owner", async function () {
      // Mint multiple tokens with different titles
      await nft
        .connect(minter)
        .mintLiterature(
          user.address,
          "ipfs://test1",
          "Title One",
          "Author One",
          2024,
          "Poetry",
          "Poem"
        );

      await time.increase(3600);

      await nft
        .connect(minter)
        .mintLiterature(
          user.address,
          "ipfs://test2",
          "Title Two",
          "Author Two",
          2024,
          "Poetry",
          "Poem"
        );

      const tokens = await nft.tokensOfOwner(user.address);
      expect(tokens.length).to.equal(2);
      expect(tokens[0]).to.equal(1);
      expect(tokens[1]).to.equal(2);
    });
  });

  describe("Input Validation", function () {
    it("Should validate year input", async function () {
      const futureYear = Math.floor(Date.now() / 1000) + 31536000; // 1 year in future
      await expect(
        nft
          .connect(user)
          .mintLiterature(
            user.address,
            "ipfs://test",
            "Test Title",
            "Test Author",
            futureYear,
            "Poetry",
            "Poem",
            { value: MINT_PRICE }
          )
      ).to.be.revertedWith("Invalid year");
    });

    it("Should validate title length", async function () {
      await expect(
        nft.connect(user).mintLiterature(
          user.address,
          "ipfs://test",
          "", // empty title
          "Test Author",
          2024,
          "Poetry",
          "Poem",
          { value: MINT_PRICE }
        )
      ).to.be.revertedWith("Title cannot be empty");
    });
  });
});
