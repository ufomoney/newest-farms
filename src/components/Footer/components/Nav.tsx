import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink
				target="_blank"
				href="https://etherscan.io/address/0xBD530a1c060DC600b951f16dc656E4EA451d1A2D"
			>
				PandaChef Contract
			</StyledLink>
			<StyledLink
				target="_blank"
				href="https://pandaswap.xyz/#/swap?outputCurrency=0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0"
			>
				PandaSwap PNDA-BNB
			</StyledLink>
			<StyledLink target="_blank" href="https://discord.gg/BW3P62vJXT">
				Discord
			</StyledLink>
			<StyledLink target="_blank" href="https://twitter.com/thebaoman">
				Twitter
			</StyledLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
	font-weight: 600;
`

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[400]};
	padding-left: ${(props) => props.theme.spacing[5]}px;
	padding-right: ${(props) => props.theme.spacing[5]}px;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.grey[500]};
	}
`

export default Nav
