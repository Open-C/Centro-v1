import { writable } from 'svelte/store'
import { tokensBySymbol } from '../data/tokens'


export let transactions = writable([
	{
		action: 'Send',
		token: tokensBySymbol['CELO'],
		amount: 10,
		price: 10,
		timestamp: 1612345678901
	},
	{
		action: 'Withdraw',
		token: tokensBySymbol['cUSD'],
		amount: 11,
		price: 11.23,
		timestamp: 1622345678901
	},
	{
		action: 'Deposit',
		token: tokensBySymbol['cEUR'],
		amount: 600,
		price: 4.5,
		timestamp: 1621234567890
	},
	{
		action: 'Sell',
		token: tokensBySymbol['CELO'],
		amount: 10,
		price: 10,
		timestamp: 1622345678901
	},
	{
		action: 'Buy',
		token: tokensBySymbol['cUSD'],
		amount: 100,
		price: 20.09,
		timestamp: 1622345678901
	},
	{
		action: 'Receive',
		token: tokensBySymbol['cEUR'],
		amount: 10,
		price: 235,
		timestamp: 1622345678901
	}
])