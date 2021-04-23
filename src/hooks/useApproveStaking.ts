import {useCallback} from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getPandaContract,
  getBambooStakingContract
} from '../panda/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const pnda = usePanda()
  const lpContract = getPandaContract()
  const contract = getBambooStakingContract()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
