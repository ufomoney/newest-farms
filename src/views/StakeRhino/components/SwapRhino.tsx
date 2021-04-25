import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { Contract } from 'web3-eth-contract'
import useModal from '../../../hooks/useModal'
import WithdrawModal from './WithdrawModal'
import useWithdrawRhino from '../../../hooks/useWithdrawRhino'
import BigNumber from 'bignumber.js'
import { contractAddresses } from '../../../panda/lib/constants'
import { getRhinoContract } from '../../../panda/utils'
import useDeposit from '../../../hooks/useDepositRhino'
import usePanda from '../../../hooks/usePanda'
import DepositModal from './DepositModal'

interface SwapRhinoProps {
	rhinoStaking: Contract
	rhinoBalance: BigNumber
	totalSupply: BigNumber
}

const SwapRhino: React.FC<SwapRhinoProps> = ({ rhinoBalance }) => {
	const [pendingTx, setPendingTx] = useState(false)

	const panda = usePanda()
	
	const address = getRhinoContract(panda)?.options.address
	const walletBalance = useTokenBalance(address)

	const { onDeposit } = useDeposit(address)
	const { onWithdraw } = useWithdrawRhino()

	const tokenName = 'RHINO'

	const [onPresentWithdraw] = useModal(
		<WithdrawModal
			max={rhinoBalance}
			onConfirm={onWithdraw}
			tokenName={tokenName}
		/>,
	)

	const [onPresentDeposit] = useModal(
		<DepositModal
			max={walletBalance}
			onConfirm={onDeposit}
			tokenName={tokenName}
		/>,
	)

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>
							<span role="img">🦏</span>
						</CardIcon>
						<Value value={getBalanceNumber(walletBalance, 9)} />
						<Label text={`${tokenName} Tokens Depositable`} />
						<Value value={getBalanceNumber(rhinoBalance, 9)} />
						<Label text={`${tokenName} Tokens Deposited`} />
					</StyledCardHeader>
					<StyledCardActions>
							<Button
								disabled={walletBalance.eq(new BigNumber(0))}
								text="Deposit RHINO"
								onClick={onPresentDeposit}
							/>
							<StyledActionSpacer />
							<Button
								disabled={rhinoBalance.eq(new BigNumber(0))}
								text="Withdraw RHINO"
								onClick={onPresentDeposit}
							/>
							<StyledActionSpacer />
					</StyledCardActions>
					<StyledActionSpacer />
					<Button
						disabled={rhinoBalance.eq(new BigNumber(0))}
						text="Convert to PNDA"
						onClick={onPresentDeposit}
					/>
				</StyledCardContentInner>
			</CardContent>
		</Card>
	)
}

const StyledCardHeader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`
const StyledCardActions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${(props) => props.theme.spacing[6]}px;
	width: 100%;
`

const StyledActionSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

export default SwapRhino
