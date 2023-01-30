import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
	return (
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
