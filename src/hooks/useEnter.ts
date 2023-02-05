import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { enter, getBambooStakingContract } from '../panda/utils'

const useEnter = () => {
  const { account } = useWallet()
  const panda = usePanda()
  const contract = getBambooStakingContract(panda)

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        contract,
        amount,
        account,
      )
      // console.log(txHash)
    },
    [account],
  )

  return { onEnter: handle }
}

export default useEnter
