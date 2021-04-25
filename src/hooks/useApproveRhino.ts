import { useCallback, useMemo } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {
  approve,
  getPandaContract,
  getRhinoStakingContract,
} from '../panda/utils'

const useApproveRhino = () => {
  const { account }: { account: string } = useWallet()
  const panda = usePanda()
  const lpContract = useMemo(() => getPandaContract(panda), [panda])
  const contract = useMemo(() => getRhinoStakingContract(panda), [panda])

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return { onApprove: handleApprove }
}

export default useApproveRhino
