import { providers } from 'ethers'
import { Machine, assign, interpret } from 'xstate'
import { networks } from './networks'

const context = {
	provider: undefined,

	walletProviderName: undefined, // 'Valora' | 'MetaMask' | 'WalletConnect',
	signer: undefined,

	address: undefined,
	phoneNumber: undefined,

	error: undefined
}

export const walletMachine = Machine/*<typeof context, {
	states: {
		disconnected: {},
		connecting: {},
		connectFailed: {},
		connected: {}
	}
}>*/({
	id: 'wallet',

	initial: 'disconnected',

	context,

	states: {
		'disconnected': {
			on: {
				'CONNECT': { target: 'connecting' }
			},
		},
		'connecting': {
			invoke: {
				src: 'connect',
				onDone: {
					target: 'connected',
					actions: 'connectDone'
				},
				onError: {
					target: 'connectFailed',
					actions: assign({
						error: (context, event) => console.error(event.data) || event.data
					})
				}
			},
			on: {
				'CANCEL': { target: 'disconnected' }
			}
		},
		'connectFailed': {
			on: {
				'RETRY': { target: 'connecting' },
				'CANCEL': { target: 'disconnected' }
			},
		},
		'connected': {
			on: { 'DISCONNECT': 'disconnected' }
		}
	},
}, {
	actions: {
		'connectDone': assign((context, event) => ({
			address: event.data.address,
			provider: event.data.provider,
			signer: event.data.signer,
		}))
	},
	services: {
		'connect': async (context, {walletProviderName = context.walletProviderName}) => {
			context.walletProviderName = walletProviderName

			const { CeloProvider, CeloWallet } = await import('@celo-tools/celo-ethers-wrapper')

			const network = networks['0xaef3']

			const provider = new CeloProvider(network.rpcUrls[0])
			await provider.ready

			if(walletProviderName === 'MetaMask'){
				const { ethereum } = globalThis
				if(!ethereum)
					throw new Error(`${walletProviderName} isn't available.`)

				await ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [network]
				})

				// const r = await ethereum.enable()
				const [address] = await ethereum.request({ method: 'eth_requestAccounts' })

				return {
					address,
					provider,
					signer: new providers.Web3Provider(ethereum).getSigner()
					// signer: new Wallet(ethereum, provider)
					// signer: new CeloWallet(ethereum, provider)
				}
			}

			await new Promise(r => setTimeout(r, 1000))

			throw new Error(`${walletProviderName} isn't available.`)
		}
	}
})

export function createWalletMachine(){
	return interpret(walletMachine).start()
}





/*
import { createStore } from 'framework7/lite'

export const createWalletStore = function(walletProviderName){
	const store = createStore({
		state: {
			status: 'disconnected', // 'disconnected' | 'connecting' | 'connectFailed' | 'connected'

			provider: undefined,

			walletProviderName: undefined, // 'Valora' | 'MetaMask' | 'WalletConnect',
			signer: undefined,

			address: undefined,
			phoneNumber: undefined,

			error: undefined
		},

		getters: {
			status: ({ state }) => state.status,

			walletProviderName: ({ state }) => state.walletProviderName,

			address: ({ state }) => state.address,
			phoneNumber: ({ state }) => state.phoneNumber,

			error: ({ state }) => state.error,
		},

		actions: {
			async initialize({ state }, walletProviderName) {
				state.status === 'connecting'

				try {
					const { CeloProvider } = await import('@celo-tools/celo-ethers-wrapper')

					const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
					await provider.ready
					state.provider = provider

					if(walletProviderName === 'MetaMask'){
						const { ethereum } = globalThis
						if(!ethereum)
							throw new Error(`MetaMask isn't available.`)

						state.signer = new CeloWallet(ethereum.provider, provider)
					}

					state.status = 'connected'
				}catch(e){
					state.error = e.errorMessage
					state.status = 'connectFailed'
				}
			},

			async connect({ state, dispatch }, walletProviderName) {
				if(status !== 'connected'){
					dispatch('initialize', walletProviderName)
				}

				state.walletProviderName = walletProviderName

				// if(walletProviderName === 'Valora'){
				// 	const {address, phoneNumber} = await {
				// 		address: '0x1234567890123456789012345678901234567890',
				// 		phoneNumber: '12345678'
				// 	}

				// 	state.address = address
				// 	state.phoneNumber = phoneNumber
				// }
			},

			async cancel({ state, dispatch }, walletProviderName) {
				if(status === 'connecting')
					dispatch('initialize', walletProviderName)
			}
		},
	})

	// if(walletProviderName)
	// 	store.dispatch('connect', walletProviderName)

	return store
}
*/