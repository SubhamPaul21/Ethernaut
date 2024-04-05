const { ethers } = require("hardhat");

const VAULT_CONTRACT_NAME = "Vault";
const VAULT_CONTRACT_ADDRESS = "0x09eBCe3C2F037587A92B3Fa6970494aE674DD4f1";

async function main() {
    const vaultFactory = await ethers.getContractFactory(VAULT_CONTRACT_NAME);
    const vaultContract = vaultFactory.attach(VAULT_CONTRACT_ADDRESS);
    console.log("Vault Contract Attached to Factory.");

    let isLocked = await ethers.provider.getStorage(await vaultContract.getAddress(), 0);
    const password = await ethers.provider.getStorage(await vaultContract.getAddress(), 1);

    console.log("Is Vault Locked? ", isLocked);
    console.log("Locked with Password: ", password);

    console.log("Unlocking Vault with Fetched Password");

    const tx = await vaultContract.unlock(password);
    await tx.wait();

    isLocked = await ethers.provider.getStorage(await vaultContract.getAddress(), 0);
    if (isLocked == "0x0000000000000000000000000000000000000000000000000000000000000000") {
        console.log("Vault Unlocked Successfully");
    } else {
        console.log("Not Unlocked yet!");
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})