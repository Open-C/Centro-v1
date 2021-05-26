pragma solidity >0.5.0;
import "../WalletFactory.sol";

abstract contract UbePair{
    address public token0;
    address public token1;
    function getReserves() public view virtual returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast);
}

/// @notice all code in the UbeSwapUtils contract taken from the UniswapV2Library code
contract UbeSwapUtils {

    /// @dev copied from UniswapV2Library code.
	function ubeGetAmountOut(
		uint amountIn,
		uint reserveIn,
		uint reserveOut) internal pure returns (uint amountOut) {
		require(amountIn > 0, 'GetAmount: INSUFFICIENT_INPUT_AMOUNT');
		require(reserveIn > 0 && reserveOut > 0, 'GetAmount: INSUFFICIENT_LIQUIDITY');
		uint amountInWithFee = amountIn.mul(997);
		uint numerator = amountInWithFee.mul(reserveOut);
		uint denominator = reserveIn.mul(1000).add(amountInWithFee);
		amountOut = numerator / denominator;
	}
    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'b3b8ff62960acea3a88039ebcf80699f15786f1b17cebd82802f7375827a339c' // init code hash from UniswapV2Factory.pairCodeHash()
            ))));
    }
}

contract UbeSwapConnector is WalletFactory, UbeSwapUtils {
    
    event AddedLiquidity(address wallet, address tok1, address tok2, uint256 amt1, uint256 amt2);
    event RemovedLiquidity(address wallet, address tok1, address tok2, uint256 liquidity);
    
    string private constant ADD_LIQUIDITY  = "addLiquidity(address,address,uint,uint,uint,uint,address,uint)";
    string private constant REMOVE_LIQUIDITY = "removeLiquidity(address,address,uint,uint,uint,address,uint)";
    string private constant SWAP_EXACT_TOKENS = "swapExactTokensForTokens(uint,uint,address[],address,uint)";

    // @dev returns address of UbeRouter contract
    function _getUbeRouter() internal view returns (address) {
        return store.getAddress("UbeswapRouter");
    }
    // @dev returns address of UbeFactory
    function _getUbeFactory() internal view returns (address) {
        return store.getAddress("UbeswapFactory");
    }
    
    // @dev returns the address of UbeLibrary
    function _getUbeLibrary() internal view returns (address) {
        return store.getAddress("UbeswapLibrary");
    }
    
    // @dev returns the reserves for a given token pair
    // @param _tok1 the address of token 1
    // @param _tok2 the address of token 2 
    function _getUbeReserves(address _tok1, address _tok2) public view returns (uint256 _amt1, uint256 _amt2) {
        UbePair pair = UbePair(_getTokenPair(_tok1, _tok2));
        (uint256 reserve1, uint256 reserve2) = pair.getReserves();
        return pair.token0() == _tok1 ? (reserve1, reserve2) : (reserve2, reserve1);
    }
    
    // @dev returns the pair for the given tokens
    // @param _tok1 the first token
    // @param _tok2 the second token
    function _getTokenPair(address _tok1, address _tok2) internal returns (address) {
        return pairFor(_getUbeFactory(), _tok1, _tok2);
    }
    
    // @notice Performs a swap between two tokens through Ubeswap 
    // @param _tokIn the address of the ERC20 to be swapped
    // @param _tokOut the address of the ERC20 to be swapped for
    // @param _amtIn the amount of _tokIn to be swapped for _tokOut
    // @param _minOut the minimum acceptable amount of _tokOut in return
    // @param _walletID the wallet to perform the swap in 
    // @returns _received the amount of _tokOut transfered
    function makeSwap(address _tokIn, address _tokOut, uint256 _amtIn, uint256 _minOut, uint256 _walletID) public returns (uint256 _received) {
        CentroWallet wallet = _getWallet(_walletID);
        address ubeRouter = _getUbeRouter();
        (uint256 reserveIn, uint256 reserveOut) = _getUbeReserves(_tokIn, _tokOut);
        require(_minOut <= ubeGetAmountOut(_amtIn, reserveIn, reserveOut), "Reserve rate lower than user's minimum specified");
        wallet.approve(_tokIn, ubeRouter, _amtIn);
        address[] memory path = new address[](2);
        path[0] = _tokIn;
        path[1] = _tokOut;
        bytes memory data = abi.encodeWithSignature(SWAP_EXACT_TOKENS, _amtIn, _amtIn, path, address(wallet), block.timestamp);
        bytes memory resp = wallet.callContract(ubeRouter, data);
        return abi.decode(resp, (uint256));
    }
    
    // @notice Uses one asset to split and add liquidity to a lending pool of _tok1 and _tok2
    // @param _baseToken address of the token which will be swapped with _tok1 or _tok2 to add liquidity
    // @param _baseAmount amount of _baseToken to add an equivalent of to LP
    // @param _tok1 address of the first desired token to add to an LP
	// @param _tok2 address of the second desired token to add to an LP
    // @param _walletID the wallet to perform the swap in 
	function addLiquidityFromOne(address _baseToken, uint256 _baseAmount, address _tok1, address _tok2, address _walletID) public {
		require(_tok1 != _tok2, "Must specify two different assets to add to the LP")

		CentroWallet wallet = _getWallet(_walletID);
		uint256 baseSplit = (_baseAmount / 2);
		uint256 amt1;
		uint256 amt2;

		if (_tok1 != _baseToken) {
			uint256 expectedOut = ubeGetAmountOut(baseSplit, _baseToken, _tok1)
			amt1 = makeSwap(_baseAmount, _tok1, baseSplit, expectedOut - 5, _walletID);
		} else {
			amt1 = baseSplit;
		}
		if (_tok2 != _baseToken) {
			uint256 expectedOut = ubeGetAmountOut(baseSplit, _baseToken, _tok2)
			amt2 = makeSwap(_baseAmount, _tok2, baseSplit, expectedOut - 5, _walletID);
		} else {
			amt2 = baseSplit;
		}
		addLiquidity(_tok1, _tok2, amt1, amt2, _walletID);
	}

    // @notice Adds liquidity to the given token pair
    // @param _tok1 first ERC20 token of the pair.  Slippage will be applied to this token
    // @param _tok2 second ERC20 token of the pair.
    // @param _amt1 the desired amount of the first token to add to the LP
    // @param _amt2 the desired amount of the second token to add to the LP
    // @param _walletID the specified wallet
    // @return response of UbeRouter addLiquidity function
    function addLiquidity(address _tok1, address _tok2, uint256 _amt1, uint256 _amt2, uint256 _walletID) internal returns (bytes memory) {
        CentroWallet wallet = _getWallet(_walletID);
        address ubeRouter = _getUbeRouter();
        
        if (_amt1 > 0) {
            wallet.approve(_tok1, ubeRouter, _amt1);
        }
        if (_amt2 > 0) {
            wallet.approve(_tok2, ubeRouter, _amt2);
        }
        bytes memory data = abi.encodeWithSignature(ADD_LIQUIDITY, _tok1, _tok2, _amt1, _amt2, _amt1.sub(5), _amt2, address(wallet), block.timestamp);
        emit AddedLiquidity(address(wallet), _tok1, _tok2, _amt1, _amt2);
        return wallet.callContract(ubeRouter, data);
    }
    
    
    // @notice Removes liquidity from the LP
    // @param _tok1 first ERC20 token of the pair. 
    // @param _tok2 second ERC20 token of the pair.
    // @param _liquidity the total liquidity to be removed.  1 liquidity corresponds to 1 LP token
    // @param _min1 the minimum amount of token 1 to remove from the LP
    // @param _min2 the minimum amount of token 2 to remove from the LP
    // @param _walletID the specified wallet
    // @return response of UbeRouter addLiquidity function
    
    // TODO: Add interface for UbePair, UbeLibrary
    function removeLiquidity(address _tok1, address _tok2, uint256 _liquidity, uint256 _min1, uint256 _min2, uint256 _walletID) internal returns (bytes memory) {
        CentroWallet wallet = _getWallet(_walletID);
        address ubeRouter = _getUbeRouter();
        address pair = _getTokenPair(_tok1, _tok2);
        wallet.approve(pair, _liquidity);
        bytes memory data = abi.encodeWithSignature(REMOVE_LIQUIDITY, _tok1, _tok2, _liquidity, _min1, _min2, address(wallet), block.timestamp);
        emit AddedLiquidity(address(wallet), _tok1, _tok2, _liquidity);
        return wallet.callContract(ubeRouter, data);
    }
}

contract UbeFarmConnector is UbeSwapConnector {
    private mapping(address => address) farmPools;

    function addPoolAddress(address _tok1, address _tok2, address _farmPool) public onlyAdmin {
        address lp = pairFor(_getUbeFactory(), _tok1, _tok2);
        farmPools[lp] = _farmPool;
    }

    function getPoolAddress(address _tok1, address _tok2) public view {
        address lp = pairFor(_getUbeFactory(), _tok1, _tok2);
        return farmPools[lp];
    }
}