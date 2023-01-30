import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import usePanda from '../../hooks/usePanda'
import { getContract } from '../../utils/erc20'
import UnstakeBamboo from './components/UnstakeBamboo'
import StakePanda from './components/StakePanda'

import { contractAddresses } from '../../panda/lib/constants'
import { getBambooSupply } from '../../panda/utils'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../utils/formatBalance'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'


const StakeBamboo: React.FC = () => {
	const { tokenAddress } = {
		tokenAddress: contractAddresses.bamboo[56],
	}

	const [totalSupply, setTotalSupply] = useState<BigNumber>()

	const panda = usePanda()
	const { ethereum } = useWallet()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		async function fetchTotalSupply() {
			const supply = await getBambooSupply(panda)
			setTotalSupply(supply)
		}
		if (panda) {
			fetchTotalSupply()
		}
	}, [panda, setTotalSupply])

	const lpContract = useMemo(() => {
		return getContract(ethereum as provider, tokenAddress)
	}, [ethereum, tokenAddress])

	return (
		<>
			<StyledFarm>
				<StyledCardsWrapper>
					<StyledCardWrapper>
						<UnstakeBamboo lpContract={lpContract} />
					</StyledCardWrapper>
					<Spacer />
					<StyledCardWrapper>
						<StakePanda />
					</StyledCardWrapper>
				</StyledCardsWrapper>
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

export default StakeBamboo
