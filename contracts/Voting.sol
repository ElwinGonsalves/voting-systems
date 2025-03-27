// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }
    
    address public owner;
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    
    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], voteCount: 0}));
        }
    }

    function vote(uint candidateIndex) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");
        
        candidates[candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;
        console.log("Vote cast for candidate: ", candidates[candidateIndex].name);
    }
    
    function getResults() public view returns (Candidate[] memory) {
        return candidates;
    }
}