const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    // Get timestamp for deployment
    const timestamp = new Date().toISOString();

    // Deployment metadata
    const deploymentMeta = {
      timestamp,
      network: hre.network.name,
      contractName: "TamilLiteratureNFT",
    };

    console.log("\n=== Deployment Started ===");
    console.log(`Time: ${timestamp}`);
    console.log(`Network: ${deploymentMeta.network}`);

    // Get deployer's address
    const [deployer] = await hre.ethers.getSigners();
    deploymentMeta.deployer = deployer.address;
    console.log(`Deployer: ${deployer.address}`);

    // Log balance
    const balance = await deployer.getBalance();
    console.log(
      `Deployer balance: ${hre.ethers.utils.formatEther(balance)} MATIC`
    );

    // Deploy contract with specific gas settings for Amoy
    const TamilLiteratureNFT = await hre.ethers.getContractFactory(
      "TamilLiteratureNFT"
    );
    console.log("\nDeploying TamilLiteratureNFT...");

    const deploymentOptions = {
      gasLimit: 50000000, // Increased to 5 million
      gasPrice: await hre.ethers.provider.getGasPrice(),
    };

    const nft = await TamilLiteratureNFT.deploy(deploymentOptions);
    console.log("Waiting for deployment transaction...");
    await nft.deployed();

    console.log(`TamilLiteratureNFT deployed to: ${nft.address}`);

    // Verify roles
    console.log("\nVerifying initial roles setup...");
    const roles = {
      MINTER_ROLE: await nft.MINTER_ROLE(),
      CURATOR_ROLE: await nft.CURATOR_ROLE(),
      ADMIN_ROLE: await nft.ADMIN_ROLE(),
      MODERATOR_ROLE: await nft.MODERATOR_ROLE(),
      UPDATER_ROLE: await nft.UPDATER_ROLE(),
    };

    // Check role assignments
    const roleAssignments = {};
    for (const [roleName, roleHash] of Object.entries(roles)) {
      roleAssignments[roleName] = await nft.hasRole(roleHash, deployer.address);
      console.log(`${roleName} Set: ${roleAssignments[roleName]}`);
    }

    // Verify contract state
    console.log("\nVerifying initial contract state...");
    const contractState = {
      name: await nft.name(),
      symbol: await nft.symbol(),
      mintPrice: hre.ethers.utils.formatEther(await nft.mintPrice()),
      maxSupply: (await nft.MAX_SUPPLY()).toString(),
    };

    Object.entries(contractState).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // Save deployment information
    const deploymentInfo = {
      ...deploymentMeta,
      contractAddress: nft.address,
      roles: roleAssignments,
      initialState: contractState,
      transactionHash: nft.deployTransaction.hash,
    };

    // Create deployments directory
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir);
    }

    // Save deployment info
    const fileName = `${deploymentMeta.network}_${timestamp.replace(
      /[:.]/g,
      "-"
    )}.json`;
    const deploymentFile = path.join(deploymentsDir, fileName);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`\nDeployment information saved to: ${deploymentFile}`);

    // Verify on Polygonscan (Amoy)
    if (hre.network.name === "amoy") {
      console.log("\nWaiting for block confirmations...");
      await nft.deployTransaction.wait(5); // Wait for 5 block confirmations

      console.log("Verifying contract on Polygonscan (Amoy)...");
      try {
        await hre.run("verify:verify", {
          address: nft.address,
          constructorArguments: [],
          network: "amoy",
        });
        console.log("Contract verified successfully!");
      } catch (error) {
        console.log("Verification error:", error.message);
      }
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
