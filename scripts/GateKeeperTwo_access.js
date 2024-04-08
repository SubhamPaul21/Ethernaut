const { error } = require('console');
const { ethers } = require('hardhat');

const CONTRACT_NAME = "GatekeeperTwo";
const ATTACKER_NAME = "GateKeeperTwo__Attacker";
const CONTRACT_ADDRESS = "0xd5D8440feB52FF34dA000E6Dcc31e5F21A43DCBB";

async function main() {
    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = contractFactory.attach(CONTRACT_ADDRESS);

    const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})