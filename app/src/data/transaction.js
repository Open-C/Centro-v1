import { createStore } from 'framework7/lite'

export function createTransactionStore(){
	return createStore({
		state: {
			status: 'created', // 'created' | 'signing' | 'rejected' | 'pending' | 'confirmed' | 'canceled'
			transactionObject: undefined,
			feeCurrency: 'cUSD', // FeeCurrency.cUSD,

			transactionID: undefined,
		
			rawTransactions: [],
			error: '',
		},

		getters: {
			status: ({ state }) => state.status,
			transactionObject: ({ state }) => state.transactionObject,
			feeCurrency: ({ state }) => state.feeCurrency,
			transactionID: ({ state }) => state.transactionID,
			rawTransactions: ({ state }) => state.rawTransactions,
			error: ({ state }) => state.error,
		},

		actions: {
			async sign({ state, dispatch }, provider) {
				if(state.status === 'created' || state.status === 'rejected'){
					state.status = 'signing'

					try {
						await new Promise(r => setTimeout(r, 1500))
						dispatch('onSigned')
					}catch(e){
						state.status = 'rejected'
					}
				}
			},

			async onSigned({state}){
				state.status = 'pending'

				await new Promise(r => setTimeout(r, 1500))

				state.status = 'confirmed'
			},

			retry({dispatch}){
				dispatch('sign')
			}
		},
	})
}