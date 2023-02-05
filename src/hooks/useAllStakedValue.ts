import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  getMasterChefContract,
  getWbnbContract,
  getFarms,
  getTotalLPUSDValue,
} from '../panda/utils'
import usePanda from './usePanda'
import useBlock from './useBlock'

export interface StakedValue {
  pid: number
  lockedUsd: BigNumber
  reward: BigNumber
}

const useAllStakedValue = (): StakedValue[] => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account, ethereum } = useWallet<provider>()
  const panda = usePanda()
  const farms = getFarms(panda)
  const masterChefContract = getMasterChefContract(panda)
  const wbnbContract = getWbnbContract(panda)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(({ pid }) => {
        return getTotalLPUSDValue(pid, masterChefContract, panda)
      }),
    )

    setBalance(balances)
  }, [account, masterChefContract, panda])

  useEffect(() => {
    if (account && masterChefContract && panda) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, panda])

  return balances
}

export default useAllStakedValue
