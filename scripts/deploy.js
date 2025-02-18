const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    // Deployment metadata
    const deploymentMeta = {
      timestamp: "2025-02-18 16:39:11",
      deployer: "vmmuthu31",
      network: hre.network.name,
      contractName: "TamilLiteratureNFT",
    };

    console.log("\n=== Deployment Started ===");
    console.log(`Time: ${deploymentMeta.timestamp}`);
    console.log(`Network: ${deploymentMeta.network}`);
    console.log(`Deployer: ${deploymentMeta.deployer}`);

    // Get deployer's address
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account: ${deployer.address}`);
    console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

    // Deploy contract
    const TamilLiteratureNFT = await ethers.getContractFactory(
      "TamilLiteratureNFT"
    );
    console.log("\nDeploying TamilLiteratureNFT...");
    const nft = await TamilLiteratureNFT.deploy();
    await nft.deployed();

    console.log(`TamilLiteratureNFT deployed to: ${nft.address}`);

    // Verify roles are set correctly
    console.log("\nVerifying initial roles setup...");
    const minterRole = await nft.MINTER_ROLE();
    const curatorRole = await nft.CURATOR_ROLE();
    const adminRole = await nft.ADMIN_ROLE();
    const moderatorRole = await nft.MODERATOR_ROLE();
    const updaterRole = await nft.UPDATER_ROLE();

    const hasAdminRole = await nft.hasRole(adminRole, deployer.address);
    const hasMinterRole = await nft.hasRole(minterRole, deployer.address);
    const hasCuratorRole = await nft.hasRole(curatorRole, deployer.address);
    const hasModeratorRole = await nft.hasRole(moderatorRole, deployer.address);
    const hasUpdaterRole = await nft.hasRole(updaterRole, deployer.address);

    console.log(`Admin Role Set: ${hasAdminRole}`);
    console.log(`Minter Role Set: ${hasMinterRole}`);
    console.log(`Curator Role Set: ${hasCuratorRole}`);
    console.log(`Moderator Role Set: ${hasModeratorRole}`);
    console.log(`Updater Role Set: ${hasUpdaterRole}`);

    // Verify initial contract state
    console.log("\nVerifying initial contract state...");
    const name = await nft.name();
    const symbol = await nft.symbol();
    const mintPrice = await nft.mintPrice();
    const maxSupply = await nft.MAX_SUPPLY();

    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Mint Price: ${ethers.utils.formatEther(mintPrice)} ETH`);
    console.log(`Max Supply: ${maxSupply}`);

    // Save deployment information
    const deploymentInfo = {
      ...deploymentMeta,
      contractAddress: nft.address,
      deployer: deployer.address,
      initialState: {
        name,
        symbol,
        mintPrice: mintPrice.toString(),
        maxSupply: maxSupply.toString(),
      },
      roles: {
        admin: hasAdminRole,
        minter: hasMinterRole,
        curator: hasCuratorRole,
        moderator: hasModeratorRole,
        updater: hasUpdaterRole,
      },
    };

    // Create deployments directory if it doesn't exist
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir);
    }

    // Save deployment info to file
    const deploymentFile = path.join(
      deploymentsDir,
      `${deploymentMeta.network}_${deploymentMeta.timestamp.replace(
        /[: ]/g,
        "_"
      )}.json`
    );

    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

    console.log(`\nDeployment information saved to: ${deploymentFile}`);

    // Verify contract on Etherscan if not on localhost
    if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
      console.log("\nWaiting for block confirmations...");
      await nft.deployTransaction.wait(6); // Wait for 6 block confirmations

      console.log("Verifying contract on Etherscan...");
      await hre.run("verify:verify", {
        address: nft.address,
        constructorArguments: [],
      });
    }

    console.log("\n=== Deployment Complete ===");
  } catch (error) {
    console.error("\nDeployment failed!");
    console.error(error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
