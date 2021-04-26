import { useCallback, useMemo } from 'react'
import { Contract } from 'web3-eth-contract'
import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { approve, getRhinoStakingContract } from '../panda/utils'

const useApproveRhino = (contract: Contract) => {
  const { account }: { account: string } = useWallet()
  const panda = usePanda()
  const rhinoStakingContract = useMemo(() => getRhinoStakingContract(panda), [
    panda,
  ])

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(contract, rhinoStakingContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, contract, rhinoStakingContract])

  return { onApprove: handleApprove }
}

export default useApproveRhino
