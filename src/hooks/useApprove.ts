import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../panda/utils'

const useApprove = (
  lpContract: Contract,
): { onApprove: () => Promise<string | false> } => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const panda = usePanda()
  const masterChefContract = getMasterChefContract(panda)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
