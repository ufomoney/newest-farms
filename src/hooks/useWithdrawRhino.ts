import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  getRhinoStakingContract,
  withdraw,
  getRhinoContract,
} from '../panda/utils'

const useWithdraw = () => {
  const { account } = useWallet()
  const panda = usePanda()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await withdraw(
        getRhinoStakingContract(panda),
        getRhinoContract(panda).options.address,
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
