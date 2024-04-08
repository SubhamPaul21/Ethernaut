require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-web3-v4");
require("@nomicfoundation/hardhat-ignition-ethers");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_ETHERNAUT_PRIVATE_KEY, process.env.SEPOLIA_PRIVATE_KEY],
    }
  }
};
