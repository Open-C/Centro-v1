// SPDX-License-Identifier: ISC

pragma solidity >0.5.0;
import "../WalletFactory.sol";

contract MentoConnector is WalletFactory {
    function buyCelo(uint256 _amount, uint256 _maxSellAmount, uint256 _walletID) external {
		CentroWallet wallet = _getWallet(_walletID);
		address exchAddr = store.getAddress("exchange");
		bytes memory data = abi.encodeWithSignature("buyCelo(uint256,uint256)", _amount, _maxSellAmount);
		wallet.approve(msg.sender, address(0), exchAddr, _maxSellAmount);
		wallet.callContract(msg.sender, 0, exchAddr, data);
	}

	function sellCelo(uint256 _amount, uint256 _minBuyAmount, uint256 _walletID) external {
		CentroWallet wallet = _getWallet(_walletID);
		bytes memory data = abi.encodeWithSignature("sellCelo(uint256,uint256)", _amount, _minBuyAmount);
		address exchAddr = store.getAddress("exchange");
		wallet.approve(msg.sender, address(0), exchAddr, _minBuyAmount);
		wallet.callContract(msg.sender, exchAddr, data);
	}
}