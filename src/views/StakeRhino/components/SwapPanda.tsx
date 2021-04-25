import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import { contractAddresses } from '../../../panda/lib/constants'
import useDepositRhino from '../../../hooks/useDepositRhino'
import useWithdrawRhino from '../../../hooks/useWithdrawRhino'
import useAllowanceRhino from '../../../hooks/useAllowanceRhino'
import useApproveRhino from '../../../hooks/useApproveRhino'
import pnda from '../../../assets/img/pnda.png'
import useDeposit from '../../../hooks/useDepositRhino'
import { getPandaAddress } from '../../../panda/utils'
import usePanda from '../../../hooks/usePanda'

interface SwapPandaProps {
	pndaBalance: BigNumber
}

const SwapPanda: React.FC<SwapPandaProps> = ({ pndaBalance }) => {
	const panda = usePanda()
	const tokenName = 'PNDA'
	const address = getPandaAddress(panda)
	const walletBalance = useTokenBalance(address)

	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowanceRhino()
	const { onApprove } = useApproveRhino()

	const { onDeposit } = useDeposit(address)
	const { onWithdraw } = useWithdrawRhino()

	const [onPresentDeposit] = useModal(
		<DepositModal
			max={walletBalance}
			onConfirm={onDeposit}
			tokenName={tokenName}
		/>,
	)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>
							<img src={pnda} alt="" height="50" />
						</CardIcon>
						<Value value={getBalanceNumber(walletBalance)} />
						<Label text={`${tokenName} Tokens Depositable`} />
						<Value value={getBalanceNumber(pndaBalance)} />
						<Label text={`${tokenName} Tokens Deposited`} />
					</StyledCardHeader>
					<StyledCardActions>
						{!allowance.toNumber() ? (
							<Button
								disabled={requestedApproval}
								onClick={handleApprove}
								text={`Approve PNDA`}
							/>
						) : (
							<>
								<Button
									disabled={walletBalance.eq(new BigNumber(0))}
									text="Deposit PNDA"
									onClick={onPresentDeposit}
								/>
								<StyledActionSpacer />
								<Button
									disabled={pndaBalance.eq(new BigNumber(0))}
									text="Withdraw PNDA"
									onClick={onPresentDeposit}
								/>
							</>
						)}
					</StyledCardActions>
				<StyledActionSpacer />
				<Button
					disabled={pndaBalance.eq(new BigNumber(0))}
					text="Convert to RHINO"
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

export default SwapPanda
