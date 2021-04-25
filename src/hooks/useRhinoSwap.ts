import { useCallback, useEffect, useMemo, useState } from 'react'

import usePanda from './usePanda'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import { Contract } from 'web3-eth-contract'

import {
  getRhinoStakingContract,
  getWithdrawableBalance,
  getRhinoContract,
  getPandaAddress,
  swapWithFee,
} from '../panda/utils'
import BigNumber from 'bignumber.js'

import useBlock from './useBlock'
import { Panda } from '../panda'

export interface RhinoSwapWithdrawableBalances {
  rhino: BigNumber
  pnda: BigNumber
}

export const useRhinoSwapWithdrawableBalances = (
  panda: Panda,
): RhinoSwapWithdrawableBalances => {
  const { account } = useWallet()
  const [rhinoBalance, setRhinoBalance] = useState(new BigNumber(0))
  const [pndaBalance, setPndaBalance] = useState(new BigNumber(0))
  const block = useBlock()

  const rhinoStakingContract = useMemo(() => getRhinoStakingContract(panda), [
    panda,
  ])

  const fetchRhinoWithdrawableBalance = useCallback(async () => {
    const balance = await getWithdrawableBalance(
      rhinoStakingContract,
      account,
      getRhinoContract(panda)?.options.address,
    )
    setRhinoBalance(new BigNumber(balance))
  }, [panda, account, rhinoStakingContract])

  const fetchPndaWithdrawableBalance = useCallback(async () => {
    const balance = await getWithdrawableBalance(
      rhinoStakingContract,
      account,
      getPandaAddress(panda),
    )
    setPndaBalance(new BigNumber(balance))
  }, [panda, account, rhinoStakingContract])

  useEffect(() => {
    if (account) {
      fetchRhinoWithdrawableBalance()
      fetchPndaWithdrawableBalance()
    }
  }, [account, block])

  return { rhino: rhinoBalance, pnda: pndaBalance }
}

const useSwapWithFee = (
  rhinoStaking: Contract,
  fromTokenAddress: string,
  toTokenAddress: string,
) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await swapWithFee(
      rhinoStaking,
      fromTokenAddress,
      toTokenAddress,
    )
    console.log(txHash)
    return txHash
  }, [account, rhinoStaking, fromTokenAddress, toTokenAddress])

  return { onRedeem: handleRedeem }
}
