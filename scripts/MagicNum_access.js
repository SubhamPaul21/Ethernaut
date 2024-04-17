const { ethers } = require("hardhat");

const CONTRACT_NAME = "MagicNum";
const CONTRACT_ADDRESS = "0xfb7F186904116aB78a37FfC33CA3CF0fB6b365c0";

async function main() {
    const [signer] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = factory.attach(CONTRACT_ADDRESS);

    let tx = await signer.sendTransaction({
        from: signer.address,
        data: "0x600a600c600039600a6000f3602a60805260206080f3",
    });

    const receipt = await tx.wait();
    const solverAddress = receipt.contractAddress
    console.log("Solver Contract Deployed at: ", solverAddress);

    tx = await contract.setSolver(solverAddress);
    await tx.wait();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})

