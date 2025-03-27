const { expect } = require("chai");

describe("Voting Contract", function () {
    let Voting, voting, owner, addr1, addr2;

    beforeEach(async function () {
        Voting = await ethers.getContractFactory("Voting");
        [owner, addr1, addr2] = await ethers.getSigners();
        voting = await Voting.deploy(["Alice", "Bob"]);
    });

    it("should allow a valid vote", async function () {
        await voting.connect(addr1).vote(0);
        const results = await voting.getResults();
        expect(results[0].voteCount).to.equal(1);
    });

    it("should prevent double voting", async function () {
        await voting.connect(addr1).vote(0);
        await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("Already voted");
    });
});