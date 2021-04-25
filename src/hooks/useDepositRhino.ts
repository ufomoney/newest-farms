import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  getRhinoStakingContract,
  deposit
} from '../panda/utils'

const useDeposit = (tokenAddress: string) => {
  const { account } = useWallet()
  const panda = usePanda()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await deposit(
        getRhinoStakingContract(panda),
        tokenAddress,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, panda],
  )

  return { onDeposit: handle }
}

export default useDeposit
