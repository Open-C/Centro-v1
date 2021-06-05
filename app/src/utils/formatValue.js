export function formatValue(value, currency, decimals = 2){ // value: number, currency?: string
	try {
		return globalThis.navigator
			? new Intl.NumberFormat(globalThis.navigator.languages, {
				... currency ? {style: 'currency', currency} : {},
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			}).format(value)
			: value
	}catch(e){
		try {
			return new Intl.NumberFormat(globalThis.navigator.languages, {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			}).format(value) + (currency ? ` ${currency}` : currency)
		}catch(e){
			console.error(e)
			return value?.toString() + (currency ? ` ${currency}` : currency)
		}
	}
}