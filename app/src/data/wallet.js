
import { createStore } from 'framework7/lite'

export const walletStore = createStore({
	state: {
		provider: undefined, // 'Valora' | 'MetaMask' | 'WalletConnect'
		address: undefined,
		phoneNumber: undefined
	},

	getters: {
		provider: ({ state }) => state.provider,
		address: ({ state }) => state.address,
		phoneNumber: ({ state }) => state.phoneNumber,
	},

	actions: {
		async connectWallet({ state }, provider) {
			state.provider = provider

			if(provider === 'Valora'){
				const {address, phoneNumber} = await {
					address: '0x1234567890123456789012345678901234567890',
					phoneNumber: '12345678'
				}

				state.address = address
				state.phoneNumber = phoneNumber
			}
		},
	},
})