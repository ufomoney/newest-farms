import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../../../components/Button'
import Card from '../../../../../components/Card'
import CardContent from '../../../../../components/CardContent'
import CardIcon from '../../../../../components/CardIcon'
import Label from '../../../../../components/Label'
import Value from '../../../../../components/Value'
import useEarnings from '../../../../../hooks/useEarnings'
import useLockedEarnings from '../../../../../hooks/useLockedEarnings'
import useReward from '../../../../../hooks/useReward'
import useValues from '../../../../../hooks/useValues'
import useSubValues from '../../../../../hooks/useSubValues'
import { getBalanceNumber } from '../../../../../utils/formatBalance'
import {
	getWbnbPrice,
	getPandaPrice,
	getWbnbPriceContract,
	getPandaPriceContract,
} from '../../../../../panda/utils'
import { BigNumber } from 'bignumber.js'
import Spacer from '../../../../../components/Spacer'
import usePanda from '../../../../../hooks/usePanda'
import pandaIcon from '../../../../../assets/img/pnda.png'

interface HarvestProps {
	pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
	const earnings = useEarnings(pid)
	const locks = useLockedEarnings()
	const [pendingTx, setPendingTx] = useState(false)
	const { onReward } = useReward(pid)
	const pnda = usePanda()
	const userInfo = useValues()
	const userSubInfo = useSubValues()

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>
							<img src={pandaIcon} height={50} />
						</CardIcon>
						<Value value={getBalanceNumber(earnings)} />
						<Label text="UFO Earned" />
					</StyledCardHeader>
					<Spacer />
					<StyledCardActions>
						<Button
							disabled={!earnings.toNumber() || pendingTx}
							text={pendingTx ? 'Collecting UFO' : 'Claim'}
							onClick={async () => {
								setPendingTx(true)
								await onReward()
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

const StyledSpacer = styled.div`
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

export default Harvest
