import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'

import { Panda } from '../../panda/index'
import { provider } from 'web3-core/types'

export interface PandaContext {
	panda?: Panda
}

export const Context = createContext<PandaContext>({
	panda: undefined,
})

declare global {
	interface Window {
		panda: Panda
	}
}

const PandaProvider: React.FC = ({ children }) => {
	const { ethereum, chainId, account } = useWallet<provider>()
	const [panda, setPanda] = useState<Panda>()

	window.panda = panda

	useEffect(() => {
		if (ethereum) {
			console.log(chainId)
			const pndaLib = new Panda(ethereum, chainId, false, {
				defaultAccount: account,
				defaultConfirmations: 1,
				autoGasMultiplier: 1.05,
				testing: false,
				defaultGas: '300000',
				defaultGasPrice: '20000000000',
				accounts: [],
				ethereumNodeTimeout: 10000,
			})
			console.log(pndaLib)
			setPanda(pndaLib)
		}
	}, [ethereum, chainId, account])

	const pandaContext: { panda: Panda } = { panda }
	return <Context.Provider value={pandaContext}>{children}</Context.Provider>
}

export default PandaProvider
