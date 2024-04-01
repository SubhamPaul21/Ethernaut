require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    }
  }
};
