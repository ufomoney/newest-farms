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

interface DepositModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
}

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

const DepositModal: React.FC<DepositModalProps> = ({
	max,
	onConfirm,
	onDismiss,
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
			<ModalTitle text={`Deposit ${tokenName} Tokens`} />
			<StyledDocsWarning>
				Before interacting with any of the contracts, please understand the{' '}
				<StyledExternalLink
					target="_blank"
					href={'https://docs.bao.finance/franchises/panda'}
				>
					project
				</StyledExternalLink>
				{''}
				the
				{''}
				<StyledExternalLink
					target="_blank"
					href={
						'https://docs.bao.finance/franchises/panda/pandaswap-fees-penalties'
					}
				>
					deposit and withdrawal fee schedule,
				</StyledExternalLink>{' '}
				and
				{''}
				<StyledExternalLink
					target="_blank"
					href={'https://docs.bao.finance/risks-of-bao-reasons-not-to-use-bao'}
				>
					risks.
				</StyledExternalLink>
			</StyledDocsWarning>
			<TokenInput
				value={val}
				onSelectMax={handleSelectMax}
				onChange={handleChange}
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
			<ModalContent>
				<StyledInfo>
					❗️ Remember a 0.75% fee will be added to the treasury when depositing. 95%
					of PNDA rewards will be locked and vested for 5 years. For more information,
						please <StyledLink href="https://docs.bao.finance/franchises/panda/pandaswap-fees-penalties" target="blank"> read
						the docs.</StyledLink>
				</StyledInfo>
			</ModalContent>
		</Modal>
	)
}

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[500]};
	text-decoration: none;
	font-weight: 600;
	&:hover {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[400]};
	font-weight: 400;
	font-size: 12px;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 750px;
`

export default DepositModal
