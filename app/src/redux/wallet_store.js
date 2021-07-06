import { createSlice, createAction } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";

const initialState = {
  connected: undefined,
  connecting: undefined,
  error: undefined,

  provider: undefined,
  walletProviderName: undefined, // 'Valora' | 'MetaMask' | 'WalletConnect'
  signer: undefined,
  address: undefined,
  phoneNumber: undefined,
};

export const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {
      initConnectWallet = (state) => ({...state, connecting: true, error: undefined}),
      walletConnectSuccessful = (state, {payload}) => ({...state, connecting: false, connected: true, ...payload}),
      walletConnectFailed = (state, {payload}) => ({...state, connecting: false, connected: false, error: payload})
  },
});


async function connectWallet(state, action) {
    const {walletProviderName=state.walletProviderName} = action.payload; 

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
            success: true,
            walletProviderName,
            address,
            provider,
            signer: new providers.Web3Provider(ethereum).getSigner()
            // signer: new Wallet(ethereum, provider)
            // signer: new CeloWallet(ethereum, provider)
        }
    }

    await new Promise(r => setTimeout(r, 1000))

    
}