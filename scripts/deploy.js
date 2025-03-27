const { ethers } = require("hardhat");

async function main() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(["Alice", "Bob", "Charlie"]);
    await voting.deployed();
    console.log("Voting contract deployed to:", voting.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
