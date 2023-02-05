import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { stake, getMasterChefContract, getRefUrl } from '../panda/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const panda = usePanda()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(panda),
        pid,
        amount,
        account,
        getRefUrl(),
      )
      // console.log(txHash)
    },
    [account, pid, panda],
  )

  return { onStake: handleStake }
}

export default useStake
