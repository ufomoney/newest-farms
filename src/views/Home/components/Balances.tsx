import BigNumber from 'bignumber.js'
import React, { useEffect, useState, Fragment } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import PandaIcon from '../../../components/PandaIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import usePanda from '../../../hooks/usePanda'
import {
	getPandaAddress,
	getPandaSupply,
	getReferrals,
	getMasterChefContract,
} from '../../../panda/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'

const PendingRewards: React.FC = () => {
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(0)
	const [scale, setScale] = useState(1)

	const allEarnings = useAllEarnings()
	let sumEarning = 0
	for (const earning of allEarnings) {
		sumEarning += new BigNumber(earning)
			.div(new BigNumber(10).pow(18))
			.toNumber()
	}

	const [farms] = useFarms()
	const allStakedValue = useAllStakedValue()

	if (allStakedValue && allStakedValue.length) {
		const sumWbnb = farms.reduce(
			(c, { id }, i) => c + (allStakedValue[i].lockedUsd.toNumber() || 0),
			0,
		)
	}

	useEffect(() => {
		setStart(end)
		setEnd(sumEarning)
	}, [sumEarning])

	return (
		<span
			style={{
				transform: `scale(${scale})`,
				transformOrigin: 'right bottom',
				transition: 'transform 0.5s',
				display: 'inline-block',
			}}
		>
			<CountUp
				start={start}
				end={end}
				decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
				duration={1}
				onStart={() => {
					setScale(1.25)
					setTimeout(() => setScale(1), 600)
				}}
				separator=","
			/>
		</span>
	)
}

const Balances: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const [totalReferrals, setTotalReferrals] = useState<string>()
	const [refLink, setRefLink] = useState<string>()
	const panda = usePanda()
	const pndaBalance = useTokenBalance(getPandaAddress(panda))
	const masterChefContract = getMasterChefContract(panda)
	const { account, ethereum }: { account: any; ethereum: any } = useWallet()

	useEffect(() => {
		async function fetchTotalSupply() {
			const supply = await getPandaSupply(panda)
			setTotalSupply(supply)
		}
		if (panda) {
			fetchTotalSupply()
		}
	}, [panda, setTotalSupply])

	useEffect(() => {
		async function fetchTotalReferrals() {
			const referrals = await getReferrals(masterChefContract, account)
			setTotalReferrals(referrals)
		}
		if (panda) {
			fetchTotalReferrals()
		}
	}, [panda, setTotalReferrals])

	useEffect(() => {
		async function fetchRefLink() {
			const usrReflink = 'www.pandaswap.xyz?ref=' + account
			setRefLink(usrReflink)
		}
		if (panda) {
			fetchRefLink()
		}
	}, [panda, setRefLink])

	return (
		<Fragment>
			<StyledWrapper>
				<Card>
					<CardContent>
						<StyledBalances>
							<StyledBalance>
								<PandaIcon />
								<Spacer />
								<div style={{ flex: 1 }}>
									<Label text="Your UFO Balance" />
									<Value
										value={account ? getBalanceNumber(pndaBalance) : 'Locked'}
									/>
								</div>
							</StyledBalance>
						</StyledBalances>
					</CardContent>
					<Footnote>
						Pending Rewards
						<FootnoteValue>
							<PendingRewards /> UFO
						</FootnoteValue>
					</Footnote>
				</Card>
				<Spacer />

				<Card>
					<CardContent>
						<Label text="Total UFO Supply" />
						<Value
							value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
						/>
					</CardContent>
					<Footnote>
						New rewards per block
						<FootnoteValue>0.0008888 UFO</FootnoteValue>
					</Footnote>
				</Card>
			</StyledWrapper>
			<Spacer />
			<Spacer />
		</Fragment>
	)
}

const Footnote = styled.div`
	font-size: 14px;
	padding: 8px 20px;
	color: ${(props) => props.theme.color.grey[400]};
	border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
	font-family: 'Roboto Mono', monospace;
	float: right;
`

const StyledWrapper = styled.div`
	align-items: center;
	display: flex;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: stretch;
	}
`

const StyledBalances = styled.div`
	display: flex;
`

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
`

export default Balances
