import { useCallback, useEffect, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { getAllowance } from '../utils/erc20'
import { getRhinoStakingContract } from '../panda/utils'

const useAllowanceRhino = (contract: Contract): BigNumber => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const panda = usePanda()
  const rhinoStakingContract = useMemo(() => getRhinoStakingContract(panda), [
    panda,
  ])

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      contract,
      account,
      rhinoStakingContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, contract, rhinoStakingContract])

  useEffect(() => {
    if (account && contract && rhinoStakingContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 5000)
    return () => clearInterval(refreshInterval)
  }, [account, contract, rhinoStakingContract])

  return allowance
}

export default useAllowanceRhino
