import { useCallback, useEffect, useState } from 'react'

import { BigNumber } from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getStaked, getMasterChefContract } from '../panda/utils'
import usePanda from './usePanda'
import useBlock from './useBlock'
import { ethers } from 'ethers'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const panda = usePanda()
  const masterChefContract = getMasterChefContract(panda)
  const block = useBlock()
  let userBalance

  const fetchBalance = useCallback(async () => {
    BigNumber.config({ DECIMAL_PLACES: 18 })
    const balance = await getStaked(masterChefContract, pid, account)
    userBalance = new BigNumber(balance)
    setBalance(userBalance.decimalPlaces(18))
  }, [account, pid, panda])

  useEffect(() => {
    if (account && panda) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, panda])

  return balance.decimalPlaces(18)
}

export default useStakedBalance
