import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  getRhinoStakingContract,
  deposit,
  getRhinoContract,
} from '../panda/utils'

const useDeposit = () => {
  const { account } = useWallet()
  const panda = usePanda()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await deposit(
        getRhinoStakingContract(panda),
        getRhinoContract(panda).options.address,
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
