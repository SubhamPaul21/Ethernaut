const { ethers } = require("hardhat");

const CONTRACT_NAME = "Token";
const CONTRACT_ADDRESS = "0xDfE2a83640a9aB3857B24110FED6E6060FEFB348";
const USER_ADDRESS = ""

async function main() {
    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = factory.attach(CONTRACT_ADDRESS);

    console.log("Attached contract for use!");
    console.log("Balance of User Before Transfer: ", ethers.formatEther(await contract.balanceOf(process.env.USER_ADDRESS)) + " ETH");

    const tx = await contract.transfer(process.env.USER_ADDRESS, 20000);
    await tx.wait(1);

    console.log("Balance of User After Transfer: ", ethers.formatEther(await contract.balanceOf(process.env.USER_ADDRESS)) + " ETH");
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})