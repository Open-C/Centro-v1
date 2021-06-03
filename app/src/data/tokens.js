import ubeswapTokenList from './ubeswap.token-list.json'

export const tokens = [...ubeswapTokenList.tokens]

export const tokensBySymbol = Object.fromEntries(tokens.map(token => [token.symbol, token]))

export const baseTokens = ['CELO', 'cUSD', 'cEUR', 'cBTC'].map(symbol => tokensBySymbol[symbol])
export const ethereumTokens = [/*'cETH'*/].map(symbol => tokensBySymbol[symbol])
export const otherTokens = tokens.filter(token => !baseTokens.includes(token))


// Centro overrides
const centroTokenList = [
	{
		symbol: 'CELO',
		name: 'Celo Gold',
		logoURI: require('../static/images/celo-icon.png').default,
		color: '#fbcc5c'
	},
	{
		symbol: 'cUSD',
		name: 'Celo Dollar',
		logoURI: require('../static/images/cusd-icon.png').default,
		color: '#54c49b'
	},
	{
		symbol: 'cEUR',
		name: 'Celo Euro',
		logoURI: require('../static/images/ceur-icon.png').default,
		color: '#6e9fec'
	},
	{
		symbol: 'cBTC',
		name: 'Celo Wrapped Bitcoin',
		color: '#f5911a'
	},
	{
		symbol: 'mCELO',
		name: 'Moola CELO',
		logoURI: require('../static/images/celo-icon.png').default,
		color: '#fbcc5c'
	},
	{
		symbol: 'mcUSD',
		name: 'Moola cUSD',
		logoURI: require('../static/images/cusd-icon.png').default,
		color: '#54c49b'
	},
	{
		symbol: 'mcEUR',
		name: 'Moola cEUR',
		logoURI: require('../static/images/ceur-icon.png').default,
		color: '#6e9fec'
	},
	{
		symbol: 'cMCO2',
		name: 'Celo Moss Carbon Credit',
		logoURI: require('../static/images/celo-icon.png').default,
		color: '#51c7fc'
	},
	{
		symbol: 'UBE',
		color: '#8b7cc4'
	}
]

for(const token of centroTokenList)
	Object.assign(tokensBySymbol[token.symbol], token)