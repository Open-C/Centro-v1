pragma solidity >0.5.0;
import "../WalletFactory.sol";


contract MoolaConnector is WalletFactory {

	string private constant mDEPOSIT = "deposit(address,uint256,uint16)";
	string private constant mREDEEM = "redeem(uint256)";

    function _getLendingPool() internal view returns (ILendingPool) {
        ILendingPoolAddressesProvider lpa = ILendingPoolAddressesProvider(store.getAddress("moola"));
        return ILendingPool(lpa.getLendingPool());
    }
    
    function _getPoolCore() internal view returns (address payable) {
        ILendingPoolAddressesProvider lpa = ILendingPoolAddressesProvider(store.getAddress("moola"));
        return lpa.getLendingPoolCore();
    }
    
    function getMoolaBalance(address _token, uint256 _walletID) public view
		returns (uint256 currentATokenBalance) {
		CentroWallet wallet = _getWallet(_walletID);
		ILendingPool moola = _getLendingPool();
		(currentATokenBalance, , , , , , , , , ) = moola.getUserReserveData(_token, address(wallet));
	}
	
	function moolaDeposit(address _token, uint256 _amount, uint256 _walletID) external payable {
		CentroWallet wallet = _getWallet(_walletID);
		ILendingPool moola = _getLendingPool();
		bytes memory data = abi.encodeWithSignature(mDEPOSIT, _token, _amount, 0);
		uint256 value = 0;
		if (_token == store.getEthAddress()) {
		    value = _amount;
		} else {
		    wallet.approve(_token, _getPoolCore, _amount);
		}
		wallet.callContract(msg.sender, address(moola), value, data);
	}
	
	function moolaWithdraw(address _token, uint256 _amount, uint256 _walletID) external payable {
		CentroWallet wallet = _getWallet(_walletID);
		bytes memory data = abi.encodeWithSignature(mREDEEM, _amount);
		wallet.callContract(msg.sender, _token, data);
	}

}