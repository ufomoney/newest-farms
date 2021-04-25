import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { enter, getRhinoStakingContract } from '../panda/utils'

const useDeposit = () => {
  const { account } = useWallet()
  const panda = usePanda()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getRhinoStakingContract(panda),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account],
  )

  return { onDeposit: handle }
}

export default useDeposit
