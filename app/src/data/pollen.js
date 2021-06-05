import { writable } from 'svelte/store'

export const pollenCircles = writable([
	{
		id: 1,
		name: 'Mwabila Farm',
		governanceModel: 'Democratic', // 'Weighted Democratic' | 'Administrator' | 'Multi-Administrator'
		depositMinimum: 0,
		period: 7, // days
		latePenalty: 0,

		balance: 831,
		earned: 27,
		periodTimeRemaining: 4,
		members: [
			{
				name: 'David',
				address: '',
				balance: 49
			},
			{
				name: 'Marek',
				address: '',
				balance: 56
			},
			{
				name: 'Eric',
				address: '',
				balance: -43
			},
			{
				name: 'Rene',
				address: '',
				balance: 37
			}
		],
		proposals: [
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Marek'
				},
				description: 'seeds & fertilizer'
			}
		],
		pastProposals: [
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Eric'
				},
				description: 'seeds & fertilizer'
			}
		],
		debts: [
			{
				type: 'Loan',
				amount: 130,
				member: {
					name: 'David'
				},
				description: 'irrigation pump'
			},
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Eric'
				},
				description: 'seeds & fertilizer'
			}
		]
	},
	{
		id: 2,
		name: 'Alta Farm',
		governanceModel: 'Weighted Democratic', // 'Weighted Democratic' | 'Administrator' | 'Multi-Administrator'
		depositMinimum: 0,
		period: 14, // days
		latePenalty: 0,

		balance: 8172,
		earned: 27,
		periodTimeRemaining: 7,
		members: [
			{
				name: 'David',
				address: '',
				balance: 49
			},
			{
				name: 'Marek',
				address: '',
				balance: 56
			},
			{
				name: 'Eric',
				address: '',
				balance: -43
			},
			{
				name: 'Rene',
				address: '',
				balance: 37
			}
		],
		proposals: [
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Marek'
				},
				description: 'seeds & fertilizer'
			}
		],
		pastProposals: [
		],
		debts: [
			{
				type: 'Loan',
				amount: 130,
				member: {
					name: 'David'
				},
				description: 'irrigation pump'
			},
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Eric'
				},
				description: 'seeds & fertilizer'
			}
		]
	},
	{
		id: 3,
		name: 'The Grove',
		governanceModel: 'Administrator', // 'Weighted Democratic' | 'Administrator' | 'Multi-Administrator'
		depositMinimum: 0,
		period: 21, // days
		latePenalty: 0,

		balance: 4529,
		earned: 27,
		periodTimeRemaining: 2,
		members: [
			{
				name: 'David',
				address: '',
				balance: 49
			},
			{
				name: 'Marek',
				address: '',
				balance: 56
			},
			{
				name: 'Eric',
				address: '',
				balance: -43
			},
			{
				name: 'Rene',
				address: '',
				balance: 37
			}
		],
		proposals: [
			
		],
		pastProposals: [
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Eric'
				},
				description: 'seeds & fertilizer'
			}
		],
		debts: [
			{
				type: 'Loan',
				amount: 130,
				member: {
					name: 'David'
				},
				description: 'irrigation pump'
			},
			{
				type: 'Loan',
				amount: 70,
				member: {
					name: 'Eric'
				},
				description: 'seeds & fertilizer'
			}
		]
	}
])