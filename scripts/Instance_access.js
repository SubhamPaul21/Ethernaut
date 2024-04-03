const { ethers } = require('hardhat')

async function main() {
    const instanceContractAddress = "0x333751B15284BCA5d40851188E6fD84FC300553C";

    const Instance = await ethers.getContractAt("Instance", instanceContractAddress);

    // Task 1 -->
    // const info = await Instance.info();
    // console.log("Info:", info);

    // Task 2 -->
    // const info1 = await Instance.info1();
    // console.log("Info1:", info1);

    // Task 3 -->
    // const info2 = await Instance.info2("hello");
    // console.log("Info2:", info2);

    // Task 4 -->
    // const infoNum = await Instance.infoNum();
    // console.log("InfoNum:", infoNum);

    // Task 5 -->
    // const info42 = await Instance.info42();
    // console.log("info42:", info42);

    // Task 6 -->
    // const theMethodName = await Instance.theMethodName();
    // console.log("theMethodName:", theMethodName);

    // Task 7 -->
    // const method7123949 = await Instance.method7123949();
    // console.log("method7123949:", method7123949);

    // Task 8 -->
    // await Instance.authenticate("unlock");

    // Task 9 -->
    // const cleared = await Instance.getCleared();
    // console.log("cleared:", cleared);
}

main()
    .then((() => process.exit(0)))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
