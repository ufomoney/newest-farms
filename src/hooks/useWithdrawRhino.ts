import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { leave, getRhinoStakingContract } from '../panda/utils'

const useWithdraw = () => {
  const { account } = useWallet()
  const panda = usePanda()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getRhinoStakingContract(panda),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account],
  )

  return { onWithdraw: handle }
}

export default useWithdraw
