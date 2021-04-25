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

interface HarvestProps {
	lpContract: Contract | undefined
}

const UnstakeRhino: React.FC<HarvestProps> = ({ lpContract }) => {
	const rhinoBalance = useTokenBalance(lpContract?.options.address)
	const [pendingTx, setPendingTx] = useState(false)

	const { onWithdraw } = useWithdrawRhino()

	const tokenName = 'RHINO'

	const [onPresentLeave] = useModal(
		<WithdrawModal
			max={rhinoBalance}
			onConfirm={onWithdraw}
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
						<Value value={getBalanceNumber(rhinoBalance)} />
						<Label text="RHINO Tokens Available" />
					</StyledCardHeader>
					<StyledCardActions>
						<Button
							disabled={!rhinoBalance.toNumber() || pendingTx}
							text={pendingTx ? 'Converting to PNDA' : 'Convert to PNDA'}
							onClick={async () => {
								setPendingTx(true)
								await onPresentLeave()
								setPendingTx(false)
							}}
						/>
					</StyledCardActions>
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

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

export default UnstakeRhino
