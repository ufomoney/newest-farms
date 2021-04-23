import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  getMasterChefContract,
  getWbnbContract,
  getFarms,
  getTotalLPWbnbValue,
} from '../panda/utils'
import usePanda from './usePanda'
import useBlock from './useBlock'
import { getContract } from '../utils/erc20'

export interface StakedValue {
  tokenAmount: BigNumber
  wbnbAmount: BigNumber
  totalWbnbValue: BigNumber
  tokenPriceInWbnb: BigNumber
  poolWeight: BigNumber
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
      farms.map(({ pid, lpContract, tokenAddress, tokenDecimals }) =>
        getTotalLPWbnbValue(
          masterChefContract,
          wbnbContract,
          lpContract,
          getContract(ethereum, tokenAddress),
          tokenDecimals,
          pid,
        ),
      ),
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
