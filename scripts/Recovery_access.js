const { ethers } = require("hardhat");

const TOKEN_CONTRACT_NAME = "SimpleToken";
const TOKEN_CONTRACT_ADDRESS = "0x97Ce72A5Ec2D68E2F63fFfC9Db9C2Cc2988a2ceE";

async function main() {
    const [signer] = await ethers.getSigners();

    const tokenFactory = await ethers.getContractFactory(TOKEN_CONTRACT_NAME);
    const tokenContract = tokenFactory.attach(TOKEN_CONTRACT_ADDRESS);

    const tx = await tokenContract.destroy(signer.address, { gasLimit: 3000000 });
    await tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})