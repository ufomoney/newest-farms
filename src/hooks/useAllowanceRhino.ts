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
  getRhinoStakingContract,
} from '../panda/utils'

const useAllowanceRhino = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const panda = usePanda()
  const lpContract = getPandaContract(panda)
  const rhinoContract = getRhinoStakingContract(panda)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      rhinoContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, lpContract, rhinoContract])

  useEffect(() => {
    if (account && lpContract && rhinoContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, lpContract, rhinoContract])

  return allowance
}

export default useAllowanceRhino
