import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { harvest, getMasterChefContract } from '../panda/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const panda = usePanda()
  const masterChefContract = getMasterChefContract(panda)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    // console.log(txHash)
    return txHash
  }, [account, pid, panda])

  return { onReward: handleReward }
}

export default useReward
