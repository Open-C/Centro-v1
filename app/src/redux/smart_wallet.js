import { createSlice, createAction } from "@reduxjs/toolkit";
import {Signer} from "ethers";

const initialState = {
  loading: false,
  error: false,
  alive: false,
  address: undefined,
  id: undefined,
  tokens: [],
  name: "",
};

export const smartWallet = createSlice({
    name: "smart_wallet",
    initialState,
    reducers: {
        initConnectWallet = (state) => ({
            ...state,
            loading: true,
            alive: false,
            error: ""
        }),
        walletConnectSuccess = (state, payload) => ({
            ...state,
            loading: false,
            alive: true,
            error: "",
            ...payload
        }),
        walletConnectError = (state, {error}) => ({
            ...state,
            error
        })
    }
});

//const createWallet = async (signer : Signer)