import { useCallback, useEffect, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getAllowance } from '../utils/erc20'
import { getPandaContract, getRhinoStakingContract } from '../panda/utils'

const useAllowanceRhino = (): BigNumber => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const panda = usePanda()
  const lpContract = useMemo(() => getPandaContract(panda), [panda])
  const rhinoStakingContract = useMemo(() => getRhinoStakingContract(panda), [
    panda,
  ])

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      rhinoStakingContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, lpContract, rhinoStakingContract])

  useEffect(() => {
    if (account && lpContract && rhinoStakingContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, lpContract, rhinoStakingContract])

  return allowance
}

export default useAllowanceRhino
