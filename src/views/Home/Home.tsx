import React from 'react'
import styled from 'styled-components'
import pnda from '../../assets/img/pnda.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
	return (
		<Page>
			<Container>
				<Balances />
			</Container>
			<div
				style={{
					margin: '0 auto',
				}}
			>
				<Button text="See the Farms" to="/farms" variant="secondary" />
			</div>
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
