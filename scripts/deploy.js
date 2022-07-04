const hardhat = require("hardhat");
//might delete nomiclabs if this fails

async function main() {
  const [deployer] = await hardhat.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const WaveContractFactory = await ethers.getContractFactory("Wave");
  const WaweContract = await WaveContractFactory.deploy();
  await WaweContract.deployed();

  console.log("deployer address:", deployer.address);
  console.log("wawecontract deployed to", WaweContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
