import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Spacer from '../../components/Spacer'
import usePanda from '../../hooks/usePanda'
import RhinoFarm from './components/RhinoFarm'
import SwapRhino from './components/SwapRhino'
import SwapPanda from './components/SwapPanda'
import { useRhinoSwapWithdrawableBalance } from '../../hooks/useRhinoSwap'
import Button from '../../components/Button'
import { getRhinoContract } from '../../panda/utils'

const StakeRhino: React.FC = () => {
	const panda = usePanda()
	const rhino = useMemo(() => getRhinoContract(panda), [panda])
	const withdrawableBalance = useRhinoSwapWithdrawableBalance(panda)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<StyledFarm>
				<StyledCardsWrapper>
					<StyledCardWrapper>
						<SwapRhino withdrawableBalance={withdrawableBalance} />
					</StyledCardWrapper>
					<Spacer />
					<StyledCardWrapper>
						<SwapPanda withdrawableBalance={withdrawableBalance} />
					</StyledCardWrapper>
				</StyledCardsWrapper>
				{rhino && (
					<div style={{ maxWidth: 400 }}>
						<Spacer />
						<Button
							size={'md'}
							href={`https://pandaswap.xyz/#/swap/?outputCurrency=${rhino.options.address}`}
							text="Swap RHINO on PandaSwap"
							variant="tertiary"
						/>
					</div>
				)}
				<Spacer size="lg" />

				{/*	<StyledCardsWrapper>
					<StyledCardWrapper>
						<RhinoFarm />
					</StyledCardWrapper>
			</StyledCardsWrapper> */}
				<StyledInfo>
					<p style={{color: 'red', fontWeight: 600}}>
						❗ Once PNDA/RHINO is deposited into the contract, it MUST be withdrawn before you can deposit again. ❗
					</p>
					<p>
						ℹ️️ This Panda:Rhino 1:1 swap contract has a 2% fee in both
						directions, with a fee that goes to a liquidity pool.
					</p>
					<p>
						The Rhino LP pair on Pandaswap will have one of the highest rewards
						on Panda farms and will receive a portion of Pandaswap fees through
						buy-and-burns from the Bamboo maker which buys Rhino. This will make
						it the highest capture point of the ecosystem in earning various
						governance token rewards.
					</p>
					<p>
						Rhino trades incur a 12% penalty. Of that 6% is added to the LP as
						permanent locked liquidity. Another 6% is distributed back to Rhino
						holders.
					</p>
					<p>
						However, to further this burn effect, 50% of the total supply of
						Rhino will be burnt at the start to the ‘dead address.’ Since it
						will be counted as a Rhino holder, each time there is a fee on
						Pandaswap, or from the Bamboo Maker buying Rhino, or from anyone
						buying or selling Rhino, then a 3% fee is essentially burnt.
					</p>
					<p>
						We’ll also drop this penalty over time. For the first 6 months,
						we’ll lower the 12% by 1% for each month until it reaches 6%. After
						that it will be lowered by 2% each year until finally the fee no
						longer exists.
					</p>
					<p>
						Since the only way to get Rhino is from the 1:1 swap, every time 1
						Rhino is burnt that means 1 Panda can no longer be claimed.
					</p>{' '}
				</StyledInfo>
				<Spacer size="lg" />
			</StyledFarm>
		</>
	)
}

const StyledFarm = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`

const StyledCardsWrapper = styled.div`
	display: flex;
	width: 600px;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledCardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 80%;
	}
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[500]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	@media (max-width: 900px) {
		width: 90%;
	}
	width: 900px;
`

export default StakeRhino
