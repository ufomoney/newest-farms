import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  getRhinoStakingContract,
  getWithdrawableBalance,
  getRhinoContract,
  getPandaAddress,
} from '../panda/utils'
import BigNumber from 'bignumber.js'

import useBlock from './useBlock'
import { Panda } from '../panda'

export const useRhinoSwapWithdrawableBalance = (panda: Panda): BigNumber => {
  const { account } = useWallet()
  const [withdrawableBalance, setWithdrawableBalance] = useState(
    new BigNumber(0),
  )
  const block = useBlock()

  const rhinoStakingContract = useMemo(() => getRhinoStakingContract(panda), [
    panda,
  ])

  const fetchRhinoWithdrawableBalance = useCallback(async () => {
    let balance = await getWithdrawableBalance(
      rhinoStakingContract,
      account,
      getRhinoContract(panda)?.options.address,
    )
    if (balance.isGreaterThan(0)) {
      setWithdrawableBalance(new BigNumber(balance))
    } else {
      balance = await getWithdrawableBalance(
        rhinoStakingContract,
        account,
        getPandaAddress(panda),
      )
    }
    setWithdrawableBalance(new BigNumber(balance))
  }, [panda, account, rhinoStakingContract])

  useEffect(() => {
    if (account) {
      fetchRhinoWithdrawableBalance()
    }
  }, [account, block])

  return withdrawableBalance
}
