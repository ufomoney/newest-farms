import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import {
  getMasterChefContract,
  getPandaContract,
  getBambooStakingContract,
} from '../panda/utils'

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const panda = usePanda()
  const lpContract = getPandaContract(panda)
  const stakingContract = getBambooStakingContract(panda)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      stakingContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, stakingContract, lpContract])

  useEffect(() => {
    if (account && stakingContract && lpContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 5000)
    return () => clearInterval(refreshInterval)
  }, [account, stakingContract, lpContract])

  return allowance
}

export default useAllowanceStaking
