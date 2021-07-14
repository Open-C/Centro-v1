import { createSlice, createAction } from "@reduxjs/toolkit";
import { providers } from "ethers";
import { networks } from "../data/networks";
import {
  ValoraProvider,
  ValoraSigner,
  valoraUtils,
} from "@open-celo/valora-ethers";
//import { ContractKit } from "@celo/contractkit";
//const kit = newKit("https://alfajores-forno.celo-testnet.org");
//console.log(kit);

//import { serializeDappKitRequestDeepLink } from "@celo/utils";

const initialState = {
  connected: undefined,
  connecting: undefined,
  error: undefined,

  provider: "Test!",
  walletProviderName: undefined, // 'Valora' | 'MetaMask' | 'WalletConnect'
  signer: undefined,
  address: undefined,
  phoneNumber: undefined,
};

export const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    initConnectWallet: (state, { walletProviderName }) => ({
      ...state,
      walletProviderName,
      connecting: true,
      error: undefined,
    }),
    walletConnectSuccess: (state, { payload }) => ({
      ...state,
      connecting: false,
      connected: true,
      ...payload,
    }),
    walletConnectFailed: (state, { payload }) => ({
      ...state,
      connecting: false,
      connected: false,
      error: payload,
    }),
  },
});

async function fetchWallet(walletProviderName) {
  //const { walletProviderName = state.walletProviderName } = action.payload;

  const { CeloProvider, CeloWallet } = await import(
    "@celo-tools/celo-ethers-wrapper"
  );

  const network = networks["0xaef3"];

  const provider = new CeloProvider(network.rpcUrls[0]);
  await provider.ready;

  if (walletProviderName === "MetaMask") {
    const { ethereum } = globalThis;
    if (!ethereum) throw new Error(`${walletProviderName} isn't available.`);

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });

    // const r = await ethereum.enable()
    const [address] = await ethereum.request({ method: "eth_requestAccounts" });

    return {
      success: true,
      walletProviderName,
      address,
      provider,
      signer: new providers.Web3Provider(ethereum).getSigner(),
      // signer: new Wallet(ethereum, provider)
      // signer: new CeloWallet(ethereum, provider)
    };
  }

  if (walletProviderName === "Valora") {
    const valora = new ValoraProvider(network.rpcUrls[0], {
      chainId: 42220,
    });
    await valora.ready;
    const resp = await valoraUtils.requestValoraAuth();
    //const signer = new ValoraSigner(valora);
    //const resp = await signer.activate();
    console.log(resp);
    return {
      success: true,
      walletProviderName,
      address: resp.address,
      valora,
      phoneNumber: resp.phoneNumber,
    };
  }

  await new Promise((r) => setTimeout(r, 1000));
  return {
    success: false,
  };
}

export const walletActions = wallet.actions;

export const connectWallet = async (dispatch, walletProviderName) => {
  dispatch({ type: actions.initConnectWallet, walletProviderName });
  const walletDetails = await fetchWallet(walletProviderName);
  console.log(walletDetails);
  if (!walletDetails.success) {
    dispatch({
      type: walletActions.walletConnectFailed,
      payload: { error: "We had trouble connecting to your wallet" },
    });
  } else {
    dispatch({
      type: walletActions.walletConnectSuccess,
      payload: walletDetails,
    });
  }
};
