import React from 'react'
import styled from 'styled-components'
import pnda from '../../assets/img/pnda.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

import immunefi from '../../assets/img/immunefi.png'

const Home: React.FC = () => {
	return (
		<Page>
			<PageHeader
				icon={pnda}
				title="PandaChef is Ready"
				subtitle="Stake PandaSwap LP tokens to earn PNDA!"
			/>
			<StyledInfo>
				Be sure to read the{' '}
				<StyledLink href="https://docs.bao.finance/franchises/panda" target="_blank">
					docs
				</StyledLink>{' '}
				before using the pools so you are familiar with protocol risks and fees!
			</StyledInfo>
			<Spacer size="md" />
			<Container>
				<Balances />
			</Container>
			<Spacer size="lg" />
			<div
				style={{
					margin: '0 auto',
				}}
			>
				<Button text="🎍 See the Farms" to="/farms" variant="secondary" />
			</div>
			<Spacer size="lg" />
			<StyledInfo>
				🏆<b>Pro Tip</b>: RHINO-BNB has the biggest weight of all pools. Check
				them{' '}
				<StyledLink href="https://docs.bao.finance/franchises/panda/pandaswap-contract-key" target="blank">
					here
				</StyledLink>
				{'.'}
			</StyledInfo>
			<Spacer size="md" />
			<StyledInfo>
				💲<b>Pro Tip</b>: The links from the "Buy X" buttons generate
				revenue for the Panda Treasury which PNDA holders own. <br />
			</StyledInfo>
			<Spacer size="md" />
				<StyledInfo>
					❗️ <span style={{ fontWeight: 600, color: 'red' }}>Attention:</span> Please familiarize yourself with the fee structure before using PandaChef.
					Deposits are subject to a 0.75% fee. Withdrawal slashing fee of 0.1% - 50 % will be incurred
					when exiting a farm, depending on the length of time your LP was staked. Please <StyledLink href="https://docs.bao.finance/franchises/panda/pandaswap-fees-penalties" target="blank"> read
					the docs</StyledLink> to familiarize yourself with fees and penalties.
				</StyledInfo>
			<Spacer size="md" />
			<StyledInfo>
				<a href="https://www.immunefi.com/bounty/baofinance" target="_blank">
					<img src={immunefi} height="200px" />
				</a>
			</StyledInfo>
		</Page>
	)
}

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[500]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 750px;

	> b {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[500]};
	text-decoration: none;
	font-weight: 600;
	&:hover {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

export default Home
