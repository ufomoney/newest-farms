import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import ModalContent from '../../../components/ModalContent'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import styled from 'styled-components'

interface WithdrawModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
	onConfirm,
	onDismiss,
	max,
	tokenName = '',
}) => {
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

	return (
		<Modal>
			<ModalTitle text={`Withdraw ${tokenName}`} />
			<TokenInput
				onSelectMax={handleSelectMax}
				onChange={handleChange}
				value={val}
				max={fullBalance}
				symbol={tokenName}
			/>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				<Button
					disabled={pendingTx}
					text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						await onConfirm(val)
						setPendingTx(false)
						onDismiss()
					}}
				/>
			</ModalActions>
			<StyledDocsWarning>
				<p>First Deposit Block:</p>
				<p>Last Withdraw Block:</p>
				<p>Current Block:</p>
				<p>Withdraw Fee:</p>
			</StyledDocsWarning>
			<ModalContent>
				{

					'Remember the longer you stay in a pool the lower your fee. Read the docs for details, but most users will want to stay in a pool 4 weeks or longer.'
				}
			</ModalContent>
		</Modal>
	)
}

export default WithdrawModal

const StyledDocsWarning = styled.span`
	background-color: ${(props) => props.theme.color.grey[300]};
	font-size: 16px;
	margin: 1rem;
	padding: 0.5rem;
	text-align: start;
	border-left: 3px solid ${(props) => props.theme.color.green};
	width: 90%;
`

const StyledExternalLink = styled.a`
	color: inherit;
	margin: 2pt;
	font-weight: 900;
	text-decoration: underline;
	display: inline;
`