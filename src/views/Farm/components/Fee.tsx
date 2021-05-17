import React from 'react'
import styled from 'styled-components'
import useFees from '../../../hooks/useFees'
import useFirstDepositBlock from '../../../hooks/useFirstDepositBlock'
import useLastWithdrawBlock from '../../../hooks/useLastWithdrawBlock'
import useLastDepositBlock from '../../../hooks/useLastDepositBlock'
import useBlockDiff from '../../../hooks/useBlockDiff'
import QuestionHelper from '../../../components/QuestionHelper'

interface FeeProps {
	pid: number
}

const Fee: React.FC<FeeProps> = ({ pid }) => {
	const firstDepositBlock = useFirstDepositBlock(pid)
	const lastWithdrawBlock = useLastWithdrawBlock(pid)
	const lastDepositBlock = useLastDepositBlock(pid)
	const fees = useFees(pid)
	const blockDiff = useBlockDiff(pid)
	const lastInteraction = new Date(
		new Date().getTime() - 1000 * (blockDiff * 3)
	).toLocaleString()

	return (
		<StyledDocsWarning>
			<Warning><b>❗BE AWARE OF WITHDRAWAL FEES❗</b></Warning>
			<p><b>Disclaimer</b> - The first deposit activates and each withdraw resets the timer for penalities and fees, this is pool based.</p>

			<p>Current Fee: {(fees * 100).toFixed(2)}%</p>
			<p>Blocks passed: {(blockDiff)}</p>
			<p>Last interaction: {(lastInteraction).toString()}
				<QuestionHelper text="This date is an estimation, it grows more innaccurate as time passes due to block times being inconsistent. For best results please manually keep track of when you stake and unstake." /></p>
			<p>Last withdraw block: {(lastWithdrawBlock)}</p>

			<p>Please <StyledLink href="https://docs.bao.finance/franchises/panda/pandaswap-fees-penalties" target="blank"> read
				the docs</StyledLink> to familiarize yourself with fees and penalties.</p>
		</StyledDocsWarning>

	)
}

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[500]};
	text-decoration: none;
	font-weight: 600;
	&:hover {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

const StyledDocsWarning = styled.span`
	background-color: ${(props) => props.theme.color.grey[300]};
	font-size: 16px;
	margin: 1rem;
	padding: 0.5rem;
	text-align: center;
	border-left: 3px solid ${(props) => props.theme.color.green};
	width: 90%;
`
const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[400]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 750px;
`
const Warning = styled.h3`
	color: red;
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 750px;
`

export default Fee
