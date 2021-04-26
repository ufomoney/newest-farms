import { useCallback } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { getRhinoStakingContract, withdraw } from '../panda/utils'

const useWithdraw = (tokenAddress: string) => {
  const { account } = useWallet()
  const panda = usePanda()

  const handle = useCallback(async () => {
    const txHash = await withdraw(
      getRhinoStakingContract(panda),
      tokenAddress,
      account,
    )
    console.log(txHash)
  }, [account, panda])

  return { onWithdraw: handle }
}

export default useWithdraw
