export function sortTokensByBalance(tokens, tokenBalances, tokenPrices){
	function getValue(token){
		return (tokenBalances[token.symbol]?.amount || 0) * (tokenPrices[token.symbol] || 0)
	}
	return tokens.sort((a, b) => getValue(b) - getValue(a))
}