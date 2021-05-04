import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Spacer from '../../components/Spacer'
import usePanda from '../../hooks/usePanda'
import SwapRhino from './components/SwapRhino'
import SwapPanda from './components/SwapPanda'
import { useRhinoSwapWithdrawableBalance } from '../../hooks/useRhinoSwap'
import Button from '../../components/Button'
import { getRhinoContract } from '../../panda/utils'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import Label from '../../components/Label'
import useTokenBalance from '../../hooks/useTokenBalance'

const StakeRhino: React.FC = () => {
	const panda = usePanda()
	const rhino = useMemo(() => getRhinoContract(panda), [panda])
	const withdrawableBalance = useRhinoSwapWithdrawableBalance(panda)

	const address = useMemo(() => getRhinoContract(panda)?.options.address, [
		panda,
	])

	const rhinoWalletBalance = useTokenBalance(address)

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
				<Spacer size="lg" />
				{rhino && (
					<StyledCardsWrapper>
						<StyledCardWrapper>
							<Card>
								<CardContent>
									<StyledCardContentInner>
										<Spacer size="sm" />
										<span style={{ fontSize: 14 }}>
											<Label text={'Swap RHINO'} />
										</span>
										<Spacer size="sm" />
										<Button
											size={'md'}
											href={`https://pandaswap.xyz/#/swap/?outputCurrency=${rhino.options.address}`}
											text="Swap RHINO on PandaSwap"
											variant="tertiary"
										/>
										<Spacer />
										{rhino && rhinoWalletBalance.isGreaterThan(0) && (
											<>
												<span style={{ fontSize: 14 }}>
													<Label text={'Add Liquidity'} />
												</span>
												<Spacer size="sm" />
												<Button
													href={`https://pandaswap.xyz/#/add/${rhino.options.address}/BNB`}
													text="Pool RHINO-BNB on Pandaswap"
													variant="tertiary"
												/>
												<Spacer />
												<span style={{ fontSize: 14 }}>
													<Label text={'Stake LP Tokens'} />
												</span>
												<Spacer size="sm" />
												<Button
													href={`https://farms.pandaswap.xyz/farms/RHINO-BNB%20PNDA-V2`}
													text="Stake RHINO-BNB in Farms"
													variant="tertiary"
												/>
											</>)}
									</StyledCardContentInner>
								</CardContent>
							</Card>
						</StyledCardWrapper>
					</StyledCardsWrapper>


				)}
				<Spacer size="lg" />
				<StyledInfo>
					<p>
						ℹ️️ This Panda:Rhino 1:1 swap contract has a 2% fee in both
						directions, on top of the usual 12% fee associated with
						Rhino transactions. For more information, please <StyledLink href="https://docs.bao.finance/franchises/panda/pandaswap-fees-penalties" target="blank"> read
						the docs</StyledLink>.
									</p>
					<p>
						❗ Once PNDA/RHINO is deposited into the contract, it MUST
						be withdrawn before you can deposit again.
									</p>
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

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
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

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[500]};
	text-decoration: none;
	font-weight: 600;
	&:hover {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

export default StakeRhino
