import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'

import { Panda } from '../../panda'

export interface PandaContext {
	panda?: typeof Panda
}

export const Context = createContext<PandaContext>({
	panda: undefined,
})

declare global {
	interface Window {
		pndasauce: any
		panda: any
	}
}

const PandaProvider: React.FC = ({ children }) => {
	const { ethereum }: { ethereum: any } = useWallet()
	const [panda, setPanda] = useState<any>()

	window.panda = panda

	useEffect(() => {
		if (ethereum) {
			const chainId = Number(ethereum.chainId)
			console.log(chainId)
			const pndaLib = new Panda(ethereum, chainId, false, {
				defaultAccount: ethereum.selectedAddress,
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
			window.pndasauce = pndaLib
		}
	}, [ethereum])

	return <Context.Provider value={{ panda }}>{children}</Context.Provider>
}

export default PandaProvider
