require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-web3-v4");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
      },
      {
        version: "0.5.0",
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_ETHERNAUT_PRIVATE_KEY, process.env.SEPOLIA_PRIVATE_KEY],
    }
  }
};
