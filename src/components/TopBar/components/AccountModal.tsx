import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import usePanda from '../../../hooks/usePanda'
import { getPandaAddress } from '../../../panda/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import pnda from '../../../assets/img/pnda.png'


const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
	const { account, reset } = useWallet()

	const handleSignOutClick = useCallback(() => {
		onDismiss!()
		reset()
	}, [onDismiss, reset])

	const panda = usePanda()
	const pndaBalance = useTokenBalance(getPandaAddress(panda))

	return (
		<Modal>
			<ModalTitle text="My Account" />
			<ModalContent>
				<Spacer />

				<div style={{ display: 'flex' }}>
					<StyledBalanceWrapper>
						<CardIcon>
						<img src={pnda} alt="" height="50" />
						</CardIcon>
						<StyledBalance>
							<Value value={getBalanceNumber(pndaBalance)} />
							<Label text="UFO Balance" />
						</StyledBalance>
					</StyledBalanceWrapper>
				</div>

				<Spacer />
				<Button
					href={`https://bscscan.com/address/${account}`}
					text="View on BscScan"
					variant="secondary"
				/>
				<Spacer />
				<Button
					onClick={handleSignOutClick}
					text="Sign out"
					variant="secondary"
				/>
			</ModalContent>
			<ModalActions>
				<Button onClick={onDismiss} text="Cancel" />
			</ModalActions>
		</Modal>
	)
}

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
