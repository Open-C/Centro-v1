// SPDX-License-Identifier: ISC

pragma solidity ^0.8.0;

contract EventEmitter {
    event DepositMade(address wallet, address token, uint256 amount);
    event WithdrawalMade(address wallet, address token, uint256 amount);
    event WalletCreated(address user, address wallet, bool isFirstWallet);

    function emitDepositMade(address wallet, address token, uint256 amount) public {
        emit DepositMade(wallet, token, amount);
    }

    function emitWithdrawalMade(address wallet, address token, uint256 amount) public {
        emit WithdrawalMade(wallet, token, amount);
    }

    function emitWalletCreated(address user, address wallet, bool isFirstWallet) public {
        emit WalletCreated(user, wallet, isFirstWallet);
    }
}