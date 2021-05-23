pragma solidity >0.5.0;


contract WalletFactory is Types {
	mapping(address => uint256[]) public addressToWalletIDs;
	mapping(uint256 => Wallet) public walletIDToWallet;
	mapping(address => uint256) currentWallet;
	uint256 numWallets;
	Storage store;
	
	constructor (address _store) public {
		store = Storage(_store);
		numWallets = 0;
	}

	function newWallet(string calldata name) external returns (bool) {
		CentroWallet wallet = new CentroWallet(msg.sender, address(store));
		address owner = msg.sender;
		Wallet storage _wallet = walletIDToWallet[numWallets];
		uint256[] storage walletIDs = addressToWalletIDs[owner];
		uint256 walletID = numWallets;

		_wallet.name = name;
		_wallet.addr = address(wallet);
		_wallet.owner = msg.sender;
		walletIDs.push(walletID);
		numWallets++;
		currentWallet[msg.sender] = walletID;
		return true;
	}

	function addWallet(address _user, address _loc, string memory name) private {
		Wallet storage _wallet = walletIDToWallet[numWallets];
		uint256[] storage walletIDs = addressToWalletIDs[_user];
		_wallet.name = name;
		_wallet.addr = _loc;
		walletIDs.push(numWallets);
		numWallets++;
	}

	function getAccountIDs(address _user) public view returns (uint256[] memory) {
		require (addressToWalletIDs[_user].length > 0, "Address does not have any accounts");
		return(addressToWalletIDs[_user]);
	}

	function getWallet(uint256 _walletID) public view returns (string memory, address) {
		Wallet storage wallet = walletIDToWallet[_walletID];
		require(wallet.addr != address(0), "Wallet does not exist");
		return (wallet.name, wallet.addr);
	}

	function getWalletAddress(uint256 _walletID) public view returns (address) {
		Wallet storage wallet = walletIDToWallet[_walletID];
		require(wallet.addr != address(0), "Wallet does not exist");
		return (wallet.addr);
	}
	
	function _getWallet(uint256 _walletID) internal view returns (CentroWallet) {
		uint256 walletID = _walletID == 0 ? currentWallet[msg.sender] : _walletID;
		require(walletID != 0, "Provide a wallet id, or persist a wallet.");
		address wallet;
		string memory name;
		(name, wallet) = super.getWallet(walletID);
		return (CentroWallet(wallet));
	}
}