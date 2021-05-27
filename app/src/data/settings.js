import { writable } from 'svelte/store'

export const requirePIN = writable(false)
export const theme = writable('auto') // 'auto' | 'light' | 'dark'