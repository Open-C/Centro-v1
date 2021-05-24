import { createWalletMachine } from './wallet'
import { writable } from 'svelte/store'

export let walletMachines = [createWalletMachine()]
export let currentWalletMachine = writable(walletMachines[0])