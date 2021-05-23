pragma solidity >0.5.0;
import "../WalletFactory.sol";

contract MentoConnector is WalletFactory {
    function buyCelo(uint256 _amount, uint256 _maxSellAmount, uint256 _walletID) external {
		CentroWallet wallet = _getWallet(_walletID);
		address exchAddr = store.getConnector("exchange");
		bytes memory data = abi.encodeWithSignature("buyCelo(uint256,uint256)", _amount, _maxSellAmount);
		wallet.approve(exchAddr, _maxSellAmount);
		wallet.callContract(msg.sender, 0, store.getConnector("exchange"), data);
	}

	function sellCelo(uint256 _amount, uint256 _minBuyAmount, uint256 _walletID) external {
		CentroWallet wallet = _getWallet(_walletID);
		bytes memory data = abi.encodeWithSignature("sellCelo(uint256,uint256)", _amount, _minBuyAmount);
		wallet.callContract(msg.sender, _amount, store.getConnector("exchange"), data);
	}
}